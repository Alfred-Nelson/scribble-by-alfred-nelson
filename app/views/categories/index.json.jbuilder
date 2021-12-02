json.categories @category do |category|
  json.extract! category, :id, :value
end
