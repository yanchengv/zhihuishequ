#encoding:utf-8
class UsersController < ApplicationController


    def new
      @user=User.new
    end

    # 创建新用户
    def create
        name=params[:user][:name]
        password=params[:user][:password]
        password2=params[:user][:password_confirmation]

        if !name.nil? &&!password.nil? && name!=''&&password!=''
          if password!=password2
            flash[:flag] = '两次密码不一致！'
            redirect_to action: :new  and return
          end
        @users=User.where(name:name)
        if @users.empty?
          @user=User.new(name:name,password:password)
          @user.save
          sign_in(@user)
          redirect_to root_path
        else
          flash[:flag] = '此用户名已被占用！'
          redirect_to action: :new
        end
        else
          flash[:flag] = '用户名和密码不能为空！'
          redirect_to action: :new
        end

    end

    def setting
       @user=User.where(id:current_user.id).first
       render template:'users/update'
    end

    #修改用户
    def update
      name=params[:user][:name]
      # password=params[:user][:password]
      if !name.nil? && name!=''
      @user=User.where(id:current_user.id).first
      @users=User.where(name:name)
      if !@user.nil? && @users.empty?
        @user.update_attributes(name:name)
        flash[:flag] = '修改成功'
      else
        flash[:flag] = '修改失败,此用户名已被占用！'
      end

      else
        flash[:flag] = '用户名不能为空！'
      end
      # redirect_to controller: :users, action: :setting
      redirect_to :back
    end

    def update_password
      id=params[:user][:id]
      password=params[:user][:password]
      password2=params[:user][:password_confirmation]

      if !password.nil? && password!=''
        if password!=password2
          flash[:flag] = '两次密码不一致！'
          redirect_to :back  and return
        end
        @user=User.where(id:id).first
        @user.update_attributes(password:password)
        flash[:flag] = '密码修改成功！'
      else
        flash[:flag] = '密码不能为空！'

      end
      redirect_to :back
    end

  private
  def user_params
    params.permit(:id,:name,:password,:phone,:email,:gender,:address,:birthday,:is_admin,:remember_token)
  end
end
