defmodule TrackerApiWeb.SuccessView do
  use TrackerApiWeb, :view

  def render("success.json", %{status: status, message: message}) do
    %{
      data: %{status: status, message: message}
    }
  end
end