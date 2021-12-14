# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(value: "Getting Started")
    @article = Article.new(heading: "hello", content: "helloooo", category: @category)
  end

  def test_article_valid
    assert @article.valid?
  end

  def test_article_should_not_be_valid_without_heading
    @article.heading = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Heading can't be blank"
  end

  def test_article_should_not_be_valid_without_content
    @article.content = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Content can't be blank"
  end

  def test_article_has_default_status
    assert_equal @article.status, "Draft"
  end
end
