defmodule TrackerApi.Mailer do
  # use Bamboo.Mailer, otp_app: :tracker_api
  use Mailgun.Client,
      domain: Application.get_env(:tracker_api, :mailgun_domain),
      key: Application.get_env(:tracker_api, :mailgun_key),
      mode: :test,
      test_file_path: "C:\\Users\\ardianck\\Desktop\\mailgun.json"

  @from Application.get_env(:tracker_api, :from_email)


  def send_confirmation_email(message_params) do
    send_email to: message_params["email"],
    from: @from,
    to: message_params["email"],
    subject: Application.get_env(:tracker_api, :registration_not_confirmed_subj),
    html_body: "<p>Hi, #{message_params["name"]}</p><br /> In order to access your account you\'ll need to activate your account by clicking this <a href='#{message_params["url"]}' target='blank'>link</a>.<br /><br /> Best Regards"
  end
end