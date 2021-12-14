# frozen_string_literal: true

class Public::ArticlesController < Public::BaseController
  before_action :load_article, only: %i[show]

  def show
    render
  end

  private

    def load_article
      @article = Article.find_by(slug: params[:slug])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end
end
