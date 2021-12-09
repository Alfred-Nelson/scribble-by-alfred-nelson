# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password validations: false
  validates :name, presence: true
end
