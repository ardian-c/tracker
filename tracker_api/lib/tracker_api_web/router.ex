defmodule TrackerApiWeb.Router do
  use TrackerApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TrackerApiWeb do
    pipe_through :api
  end
end
