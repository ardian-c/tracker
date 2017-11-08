defmodule TrackerApi.Application do
  use Application

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(TrackerApi.Repo, []),
      # Start the endpoint when the application starts
      supervisor(TrackerApiWeb.Endpoint, []),

      worker(Mongo, [[database: Application.get_env(:tracker_api, :db)[:name], name: :mongo]])
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TrackerApi.Supervisor]
    result = Supervisor.start_link(children, opts)
    TrackerApi.Startup.ensure_indexes
    result
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    TrackerApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
