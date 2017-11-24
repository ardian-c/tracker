defmodule TrackerApiWeb.UserController do
  use TrackerApiWeb, :controller
  import Ecto.Query

  alias TrackerApiWeb.{User, ConfirmationToken, SessionView, UserView, ChangesetView, SuccessView}
  alias TrackerApi.{Repo, SendEmailWorker}

  plug :scrub_params, "user" when action in [:create]
  # plug Guardian.Plug.EnsureAuthenticated, [ handler: TrackerApiWeb.SessionController ] when action in [:show]

  @doc """
  Get current user.
  """
  def show(conn, _params) do
    current_token = Guardian.Plug.current_token(conn)
    case Guardian.decode_and_verify(current_token) do
      {:ok, claims} ->
        case TrackerApi.GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            Plug.Conn.assign(conn, :current_user, user)
            conn
            |> put_status(:ok)
            |> render(UserView, "user.json", %{user: user})
          {:error, _reason} ->
          send_resp(conn, 200, "")
      end
      {:error, _reason} ->
        send_resp(conn, 200, "")
    end
  end


  @doc """
  Create new user.
  """
  def create(conn, %{ "user" => user_params }) do
    changeset = User.changeset(%User{}, user_params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        # Generate confirmation token
        confirmation_token = ConfirmationToken.generate_new_account_token(user)
        verification_url = "#{ Application.get_env(:tracker_api, :app_client_url) }account/confirmation/#{confirmation_token}";

        # Update user -> confirmation_token
        new_changeset = User.changeset(user, %{confirmation_token: confirmation_token})
        case Repo.update(new_changeset) do
          {:ok, new_user} ->
            # Send email
            message = %{ url: verification_url, email: new_user.email, name: new_user.name }
            Exq.enqueue_in(Exq, "email", 30, SendEmailWorker, [message])

            conn
            |> put_status(:created)
            |> render(SuccessView, "success.json", %{ status: 200, message: "Account created successfully. Please check your email to confirm your account!" })
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(ChangesetView, "error.json", changeset: changeset)
       end
    end
  end

  @doc """
  Confirm user by token.
  """
  def confirm(conn, %{ "token" => token}) do
    user = Repo.one!(from u in User, where: u.confirmation_token == ^token)
    changeset = User.confirmation_changeset(user, %{ confirmation_token: "", is_confirmed: "1" })

    case Repo.update(changeset) do
      {:ok, user} ->
        { :ok, jwt, _ } = Guardian.encode_and_sign(user, :token)
        new_conn = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)
        {:ok, claims} = Guardian.Plug.claims(new_conn)

        new_conn
        |> put_status(:created)
        |> render(TrackerApiWeb.SessionView, "show.json", %{ user: user, jwt: jwt })
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end
end