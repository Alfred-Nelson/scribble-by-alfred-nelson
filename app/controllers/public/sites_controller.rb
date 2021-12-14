# frozen_string_literal: true

class Public::SitesController < Public::BaseController
  before_action :has_password_digest, only: %i[get_authentication_token]

  def get_authentication_token
    unless @site.authenticate(sites_params[:password])
      render status: :unauthorized, json: { error: t("incorrect_credentials") }
    end
  end

  private

    def sites_params
      params.require(:site).permit(:password)
    end

    def has_password_digest
      @site = Site.first
      if !@site.password_digest?
        render
      end
    end
end
