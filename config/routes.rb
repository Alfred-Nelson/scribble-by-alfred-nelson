# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  defaults format: :json do
    namespace :public do
      resource :site do
        post "get_authentication_token", on: :member
      end
      resources :categories, only: %i[index]
      resources :articles, only: %i[show], param: :slug
    end
    resources :categories, except: %i[new edit]
    resources :articles, except: %i[new edit]
    resource :site, only: %i[update show]
    resources :redirections, except: %i[new edit show]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
