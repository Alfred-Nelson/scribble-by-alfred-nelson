# frozen_string_literal: true

class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.text :name
      t.text :email
      t.timestamps
    end
  end
end
