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
    plug Guardian.Plug.VerifyHeader, realm: "Bearer" # looks for token in authorization header
    plug Guardian.Plug.LoadResource # makes the current resource available Guardian.Plug.current_resource(conn)
  end

  pipeline :exq do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :put_secure_browser_headers
    plug ExqUi.RouterPlug, namespace: "exq"
  end

  scope "/api", TrackerApiWeb do
    pipe_through :api

    scope "/v1" do
      post "/register", UserController, :create
      post "/auth/confirmation", UserController, :confirm

      get "/current_user", UserController, :show
    end
  end

  scope "/exq", ExqUi do
    pipe_through :exq

    forward "/", RouterPlug.Router, :index
  end

#  if Mix.env === :dev do
#    forward "/sent_emails", Bamboo.EmailPreviewPlug
#  end

  scope "/", TrackerApiWeb do
    get "/*path", ApplicationController, :not_found
  end
end
