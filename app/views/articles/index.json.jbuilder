json.articles @articles do |article|
  json.extract! article, :heading, :updated_at, :status
  json.category article.category.value
  json.author @user.name
end
