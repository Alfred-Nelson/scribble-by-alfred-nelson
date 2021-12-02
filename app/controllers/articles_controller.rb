# frozen_string_literal: true

class ArticlesController < ApplicationController
  def create
    article = Article.new(article_params)
    if article.save
      render status: :ok, json: { notice: t("created", entity: "Article") }
    else
      render status: :unprocessable_entity, json: { error: article.errors.full_messages }
    end
  end

  private

    def article_params
      params.require(:article).permit(:heading, :content, :status, :category_id)
    end
end
