# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: %i[update destroy]
  def index
    @category = Category.includes(:articles).all.order("position")
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok,
        json: {
          notice: t("created", entity: "Category"),
          id: category.id,
          position: category.position
        }
    else
      render status: :unprocessable_entity, json: { error: category.errors.full_messages }
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { notice: t("destroyed", entity: "Category") }
    else
    end
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: { notice: t("updated", entity: "Category") }
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages }
    end
  end

  private

    def load_category
      @category = Category.find_by_id(params[:id])
      unless @category
        render status: :ok, json: { error: t("not_found", entity: "Category") }
      end
    end

    def category_params
      params.require(:category).permit(:value, :position)
    end
end
