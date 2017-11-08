defmodule TrackerApiWeb.ApplicationView do
  use TrackerApiWeb, :view

  def render("not_found.json", _) do
    %{error: "Not found!"}
  end
end