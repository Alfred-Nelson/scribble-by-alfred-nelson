# frozen_string_literal: true

class RenameTypeToValueInCategory < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :type, :value
  end
end
