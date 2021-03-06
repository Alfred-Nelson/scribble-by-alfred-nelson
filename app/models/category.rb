# frozen_string_literal: true

class Category < ApplicationRecord
  acts_as_list
  has_many :articles, dependent: :nullify
  validates :value, presence: true
end
