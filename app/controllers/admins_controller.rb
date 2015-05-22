class AdminsController < ApplicationController
  layout 'admin'

  # 登陆
  def login

  end

  def home

  end

  def show

  end
   def setting
     @user=User.where(id:current_user.id).first
   end

end
