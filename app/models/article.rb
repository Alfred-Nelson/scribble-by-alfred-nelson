# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category, optional: true
  validates :heading, :content, presence: true
end
