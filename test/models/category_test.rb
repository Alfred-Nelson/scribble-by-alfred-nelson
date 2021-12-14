# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(value: "Getting Started")
  end

  def test_category_is_valid
    assert @category.valid?
  end

  def test_category_should_not_be_valid__without_value
    @category.value = nil
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Value can't be blank"
  end
end
