# frozen_string_literal: true

class AddSlugAsIndexToArticles < ActiveRecord::Migration[6.1]
  def change
    add_index :articles, :slug, unique: true
  end
end
