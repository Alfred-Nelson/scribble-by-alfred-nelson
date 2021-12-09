# frozen_string_literal: true

class CreateSite < ActiveRecord::Migration[6.1]
  def change
    create_table :sites do |t|
      t.text :name, null: false
      t.string :password_digest

      t.timestamps
    end
  end
end
