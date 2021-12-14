# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = Site.new(name: "SpinKart", password: "welcome1")
  end

  def test_site_is_valid
    assert @site.valid?
  end

  def test_site_name_cannot_be_blank
    @site.name = ""
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Name can't be blank"
  end
end
