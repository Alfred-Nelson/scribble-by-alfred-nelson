json.categories @categories do |category|
    json.extract! category, :value
    json.article do
      json.articles category.articles, :heading, :slug
    end
end
