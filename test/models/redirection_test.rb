# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = Redirection.new(from: "/login", to: "/app")
  end

  def test_redirection_from_uniqueness
    @redirection.save!
    new_redirection = @redirection.dup
    assert_not new_redirection.valid?
  end
end
