Rails.application.routes.draw do
  mount WeixinRailsMiddleware::Engine, at: "/"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
   root 'home#index'

  resource :home do
    collection do
      get 'huishequ',to:'home#huishequ'
      get 'huishenghuo',to:'home#huishenghuo'
      get 'huibangong',to:'home#huibangong'
      get 'huigouwu',to:'home#huigouwu'
      get 'about_us',to:'home#about_us'
      get 'join_us',to:'home#join_us'
      get 'app',to:'home#app'
    end
  end
  resource :users do
    collection do
     get 'new',to:'users#new'
     get 'setting',to:'users#setting'
     post 'update',to:'users#update'
     post 'create',to:'users#create'
    end
  end

    resource :admins do
      collection do
         get 'login',to:'admins#login'
         get 'home',to:'admins#home'
         get 'setting',to:'admins#setting'
      end
    end

   resources :sessions do
     collection do
       get 'new',to:'sessions#new'
       post 'create',to:'sessions#create'
       post 'admin_login',to:'sessions#admin_login'
       match '/destroy', to: 'sessions#destroy', via: [:delete,:get]
     end
   end
   resource :events do
     collection do
       get 'show',to:'events#show'
       get 'new',to:'events#new'
       post 'create',to:'events#create'
       get 'destroy',to:'events#destroy'
       get 'show_update',to:'events#show_update'
       post 'update',to:'events#update'
     end
   end

    resource :mobile_home  do
      collection do
        get 'home',to:'mobile_home#home'
      end
    end

   resource :weixins do
     collection do
       get 'index',to:'weixins#index'
       get 'huishequ',to:'weixins#huishequ'
       get 'huishenghuo',to:'weixins#huishenghuo'
       get 'huibangong',to:'weixins#huibangong'
       get 'huigouwu',to:'weixins#huigouwu'
       get 'about_us',to:'weixins#about_us'
       get 'join_us',to:'weixins#join_us'
       get 'app',to:'weixins#app'
     end
   end

   get 'weixin_patient/health_record',to:'weixin#home'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
