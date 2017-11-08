defmodule TrackerApiWeb.UserView do
  use TrackerApiWeb, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email
    }
  end
end