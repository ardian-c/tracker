defmodule TrackerApi.Repo do
  use Ecto.Repo, otp_app: :tracker_api
  use Scrivener, page_size: 25
end
