defmodule TrackerApiWeb.Router do
  use TrackerApiWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", TrackerApiWeb do
    pipe_through :api

    scope "/v1" do
      post "/register", UserController, :create
    end
  end

  scope "/", TrackerApiWeb do
    get "/*path", ApplicationController, :not_found
  end
end
