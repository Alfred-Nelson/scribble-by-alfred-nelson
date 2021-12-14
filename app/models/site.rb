# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password validations: false
  has_secure_token :authentication_token
  validates :name, presence: true
end
