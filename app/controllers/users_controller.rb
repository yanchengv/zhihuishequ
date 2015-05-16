#encoding:utf-8
class UsersController < ApplicationController
    def login

    end

    def new
      @user=User.new
    end

    def create
        name=params[:user][:name]
        password=params[:user][:password]
        @user=User.new(name:name,password:password)
        @user.save
    end

  private
  def user_params
    params.permit(:id,:name,:password,:phone,:email,:gender,:address,:birthday)
  end
end
