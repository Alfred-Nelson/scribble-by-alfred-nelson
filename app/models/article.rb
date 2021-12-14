# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { Draft: 0, Published: 1 }
  belongs_to :category, optional: true
  validates :heading, :content, presence: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("immutable"))
      end
    end

    def set_slug
      heading_slug = heading.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug = Article.where(
        regex_pattern,
        "#{heading_slug}$|#{heading_slug}-[0-9]+$"
      ).order(created_at: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{heading_slug}-#{slug_count + 1}" : heading_slug
      self.slug = slug_candidate
    end
end
