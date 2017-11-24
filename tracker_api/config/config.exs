# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tracker_api,
  ecto_repos: [TrackerApi.Repo],
  namespace: TrackerApiWeb

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

config :guardian, Guardian,
   allowed_algos: ["HS512"],
   verify_module: Guardian.JWT,
   issuer: "TrackerApi",
   ttl: {30, :days},
   verify_issuer: true,
   serializer: TrackerApi.GuardianSerializer

config :exq,
  name: Exq,
  host: "127.0.0.1",
  port: 6379,
  namespace: "exq",
  concurrency: 1000,
  queues: ["email"]

config :exq_ui,
#  webport: 4040,
#  webspace: "",
  server: true

config :tracker_api, TrackerApi.Mailer,
       adapter: Bamboo.MailgunAdapter,
       retries: 3

config :logger,
       backends: [:console], # default, support for additional log sinks
       compile_time_purge_level: :info # purges logs with lower level than this

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
import_config "config.secret.exs"