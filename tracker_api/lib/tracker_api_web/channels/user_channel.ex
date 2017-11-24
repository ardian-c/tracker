defmodule TrackerApi.UserChannel do
  use TrackerApiWeb, :channel

  require Logger

  def join("users:" <> user_id, _params, socket) do
    current_user = socket.assigns.current_user
    Logger.info fn -> "Current USER: #{inspect(current_user)}" end
    if user_id == current_user.id do
      {:ok, socket}
    else
      {:error, %{reason: "Invalid user"}}
    end
  end
end