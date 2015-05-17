#encoding:utf-8
class UsersController < ApplicationController


    def new
      @user=User.new
    end

    # 创建新用户
    def create
        name=params[:user][:name]
        password=params[:user][:password]
        @user=User.new(name:name,password:password)
        @user.save
       redirect_to root_path
    end

    def setting
       @user=User.where(id:current_user.id).first
       render template:'users/update'
    end

    #修改用户
    def update
      name=params[:users][:name]
      password=params[:users][:password]
      @user=User.where(id:current_user.id).first

      if !@user.nil?
        @user.update_attributes(name:name,password:password)
        flash[:flag] = '修改成功'
      else
        flash[:flag] = '修改失败'
      end
      redirect_to controller: :users, action: :update
    end
  private
  def user_params
    params.permit(:id,:name,:password,:phone,:email,:gender,:address,:birthday,:remember_token)
  end
end
