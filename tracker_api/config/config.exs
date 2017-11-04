# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tracker_api,
  ecto_repos: [TrackerApi.Repo]

# Configures the endpoint
config :tracker_api, TrackerApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Q8IaXaudD3Xg8QkLgDHow1LFUOalDi90Wbc/iW+/Bcp0pdKxnQ5EyLZ9xxNC5X1P",
  render_errors: [view: TrackerApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: TrackerApi.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
