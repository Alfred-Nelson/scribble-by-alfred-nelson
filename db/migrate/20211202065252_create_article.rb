# frozen_string_literal: true

class CreateArticle < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.text :heading, null: false
      t.text :content, null: false
      t.integer :status, default: 0
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
