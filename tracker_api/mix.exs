defmodule TrackerApi.Mixfile do
  use Mix.Project

  def project do
    [
      app: :tracker_api,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {TrackerApi.Application, []},
      applications: [
        :phoenix, :phoenix_pubsub, :gettext,
        :phoenix_ecto, :mongodb, :mongodb_ecto, :ecto,
        :cowboy, :logger,
        :poolboy, :uuid,
        :comeonin, :scrivener_ecto, :corsica
      ],
      extra_applications: [:runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.2.1"},
      {:plug, "~>1.3.5", override: true},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, github: "phoenixframework/phoenix_ecto", ref: "v3.0.1"},
      {:mongodb, ">= 0.0.0"},
      {:mongodb_ecto, github: "ankhers/mongodb_ecto", branch: "ecto-2"},
      {:ecto, "~> 2.0.0", override: true},
      {:gettext, "~> 0.11"},
      {:uuid, "~> 1.1" },
      {:timex, "~> 3.0"},
      {:cowboy, "~> 1.0"},
      {:comeonin, "~> 2.5"},
      {:guardian, "~> 0.14.0"},
      {:corsica, "~> 0.5.0"},
      {:scrivener_ecto, "~> 1.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      "test": ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
