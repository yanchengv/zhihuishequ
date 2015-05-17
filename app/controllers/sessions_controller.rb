#encoding: utf-8
class SessionsController < ApplicationController
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

end
