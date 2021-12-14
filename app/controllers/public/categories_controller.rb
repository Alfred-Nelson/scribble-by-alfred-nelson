# frozen_string_literal: true

class Public::CategoriesController < Public::BaseController
  before_action :authenticate_user_using_x_auth_token, only: %i[index]

  def index
    @categories = Category.includes(:articles).where("articles.status = 1").references(:articles)
  end
end
