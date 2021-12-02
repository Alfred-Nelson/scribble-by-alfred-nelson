# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @category = Category.all
  end
end
