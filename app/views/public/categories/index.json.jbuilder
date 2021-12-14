json.categories @categories do |category|
    json.extract! category, :value
    json.articles category.articles do |article|
      json.extract! article, :heading, :slug
    end
end
