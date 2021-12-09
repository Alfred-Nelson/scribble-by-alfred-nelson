# frozen_string_literal: true

class SitesController < ApplicationController
  def show
    @site = Site.first
  end

  def update
    site = Site.first
    if site.update(site_params)
      render status: :ok, json: { notice: t("updated", entity: "Site Details") }
    else
      render status: :unprocessable_entity, json: { error: site.errors.full_messages }
    end
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end
end
