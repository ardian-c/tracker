defmodule TrackerApiWeb.UserController do
  use TrackerApiWeb, :controller
  alias TrackerApiWeb.User
  alias TrackerApi.Repo

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{ "user" => user_params }) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(TrackerApiWeb.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(TrackerApiWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end