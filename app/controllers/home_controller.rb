#encoding:utf-8
class HomeController < ApplicationController
    def index
      # 判断手机访问还是pc端
      user_agent_string=request.user_agent
      ua = AgentOrange::UserAgent.new(user_agent_string)
      device = ua.device
      user_agent=device.is_mobile?
      if user_agent
        #user_agent=true则是手机访问
        redirect_to controller: :mobile_home,action: :home and return
      end
    end


end
