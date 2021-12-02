# frozen_string_literal: true

class CreateCategory < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.text :type, null: false
      t.timestamps
    end
  end
end
