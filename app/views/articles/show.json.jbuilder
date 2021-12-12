# frozen_string_literal: true

json.article do
  json.extract! @article, :heading, :content
  json.category do
    json.extract! @article.category, :id, :value if @article.category
  end
end

json.categories @categories do |category|
  json.extract! category, :id, :value
end
