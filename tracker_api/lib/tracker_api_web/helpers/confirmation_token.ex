defmodule TrackerApiWeb.ConfirmationToken do
  alias TrackerApiWeb.User

  @moduledoc """
  Handles creating and validating confirmation tokens.
"""

  @account_verification_salt Application.get_env(:tracker_api, :account_verification_salt)

  def generate_new_account_token(%User{id: user_id}) do
    Phoenix.Token.sign(TrackerApiWeb.Endpoint, @account_verification_salt, user_id)
  end
#
#  def verify_new_account_token(token) do
#    # max_age = 86_400 # tokens are valid for a day only
#    Phoenix.Token.verify(TrackerApiWeb.Endpoint, @account_verification_salt, token)
#  end
end