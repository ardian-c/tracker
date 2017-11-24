defmodule TrackerApiWeb.UserView do
  use TrackerApiWeb, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      email: user.email,
      confirmed: user.is_confirmed
    }
  end
end