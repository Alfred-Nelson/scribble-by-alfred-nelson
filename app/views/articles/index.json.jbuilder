# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :id, :heading, :updated_at, :status
  json.category article.category.value
  json.author @user_name
end

json.categories @categories do |category|
  json.extract! category, :id, :value
  json.article_count category.articles.length
end
