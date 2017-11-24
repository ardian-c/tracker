defmodule TrackerApiWeb.User do
  use TrackerApiWeb, :model

  @derive {Poison.Encoder, only: [:id, :email]}

  @primary_key {:id, :binary_id, autogenerate: true}

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string, virtual: true
    field :encrypted_password, :string
    field :is_confirmed, :string, default: "0"
    field :confirmation_token, :string, default: ""

    timestamps()
  end

  @required_fields ~w(name email password)
  @optional_fields ~w(encrypted_password is_confirmed confirmation_token)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken", name: :email_idx)
    |> generate_encrypted_password
  end

  def confirmation_changeset(model, params \\ %{}) do
    model
    |> cast(params, [:confirmation_token, :is_confirmed])
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end