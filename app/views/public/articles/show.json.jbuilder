json.article do
  json.extract! @article, :heading, :content, :updated_at
  json.category @article.category.value
end
