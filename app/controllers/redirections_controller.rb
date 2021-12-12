# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection, only: %i[update destroy]
  def index
    @redirections = Redirection.all
  end

  def create
    redirection = Redirection.new(redirection_params)
    if redirection.save
      render status: :ok, json: { notice: t("created", entity: "Redirection") }
    else
      render status: :unprocessable_entity, json: { error: redirection.errors.full_messages }
    end
  end

  def update
    if @redirection.update(redirection_params)
      render status: :ok, json: { notice: t("updated", entity: "Redirection") }
    else
      render status: :unprocessable_entity, json: { error: @redirection.errors.full_messages }
    end
  end

  def destroy
    if @redirection.destroy
      render status: :ok, json: { notice: t("destroyed", entity: "Redirection") }
    else
      render status: :unprocessable_entity, json: { error: @redirection.errors.full_messages }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection
      @redirection = Redirection.find_by(id: params[:id])
      unless @redirection
        render status: :not_found, json: { error: t("not_found", entity: "Redirection") }
      end
    end
end
