# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  defaults format: :json do
    resources :categories, except: %i[new edit]
    resources :articles, except: %i[new edit]
    resource :site, only: %i[update show]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
