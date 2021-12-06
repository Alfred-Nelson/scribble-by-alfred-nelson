# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { Draft: 0, Published: 1 }
  belongs_to :category, optional: true
  validates :heading, :content, presence: true
end
