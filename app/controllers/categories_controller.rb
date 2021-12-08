# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @category = Category.includes(:articles).all
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok, json: { notice: "Successfully created Categories" }
    else
      render status: :unprocessable_entity, json: { error: category.errors.full_messages }
    end
  end

  private

    def category_params
      params.require(:category).permit(:value)
    end
end
