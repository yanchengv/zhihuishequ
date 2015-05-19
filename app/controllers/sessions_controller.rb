#encoding: utf-8
class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token,only: :admin_login
    def new

    end

    #登录
   def create
     name=params[:sessions][:name]
     password=params[:sessions][:password]
     user = User.find_by(name:name)
     if user && user.authenticate(password)
       #登录成功
       sign_in(user)
       redirect_to root_path
     else
       flash[:error] = '用户名或者密码错误' # Not quite right!
       redirect_to action: :new
     end

   end

    def destroy
        sign_out
       redirect_to root_path
    end



#   后台登陆
    def admin_login
      name=params[:sessions][:name]
      password=params[:sessions][:password]
      user = User.where(name:name,is_admin:1).first

      if user && user.authenticate(password)
        p 888888888
        #登录成功
        sign_in(user)
        redirect_to controller: :admins,action: :home
      else
        flash[:error] = '用户名或者密码错误' # Not quite right!
        redirect_to action: :login ,controller: :admins
      end
    end
end
