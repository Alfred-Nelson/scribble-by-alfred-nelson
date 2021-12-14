# frozen_string_literal: true

class Public::BaseController < ApplicationController
  protect_from_forgery with: :exception

  def authenticate_user_using_x_auth_token
    puts request.headers
    auth_token = request.headers["X-Auth-Token"].presence
    site = Site.first

    unless auth_token &&
      ActiveSupport::SecurityUtils.secure_compare(
        site.authentication_token, auth_token
      )
      render status: :unauthorized, json: { error: t("unauthenticated") }
    end
  end
end
