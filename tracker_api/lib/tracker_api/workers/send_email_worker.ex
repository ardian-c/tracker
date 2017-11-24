defmodule TrackerApi.SendEmailWorker do

  alias TrackerApi.{Mailer}

  def perform(message_params) do
    Mailer.send_confirmation_email(message_params)
  end
end