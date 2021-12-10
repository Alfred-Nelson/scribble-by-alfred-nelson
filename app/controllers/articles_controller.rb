# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[show destroy update]

  def index
    @articles = Article.includes(:category).all
    @categories = Category.includes(:articles).all.order("position")
    @user_name = User.first.name
  end

  def create
    article = Article.new(article_params)
    if article.save
      render status: :ok, json: { notice: t("created", entity: "Article") }
    else
      render status: :unprocessable_entity, json: { error: article.errors.full_messages }
    end
  end

  def show
    @categories = Category.all.order("position")
  end

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: t("destroyed", entity: "Article") }
    else
      render status: :ok, json: { error: @article.errors.full_messages }
    end
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: { notice: t("updated", entity: "Article") }
    else
      render status: :ok, json: { error: @article.errors.full_messages }
    end
  end

  private

    def article_params
      params.require(:article).permit(:heading, :content, :status, :category_id)
    end

    def load_article
      @article = Article.find_by_id(params[:id])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end
end
