# frozen_string_literal: true

class Site < ApplicationRecord
  has_secure_password validations: false
  has_secure_token :authentication_token
  validates :name, presence: true
  validates :password, format: { with: /\d/, message: "Password should contain atleast 1 digit" }, if: -> {
   self.password_digest? }
  validates :password, format: { with: /[A-Za-z]/, message: "Password should contain atleast 1 alphabet" }, if: -> {
   self.password_digest? }
  validates :password, length: { minimum: Constants::MIN_LENGTH }, if: -> { self.password_digest? }
end
