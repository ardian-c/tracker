defmodule TrackerApiWeb.ApplicationController do
  use TrackerApiWeb, :controller

  def not_found(conn, _params) do
    conn
    |> put_status(:not_found)
    |> render(TrackerApiWeb.ApplicationView, "not_found.json")
  end
end