#encoding:utf-8
class HomeController < ApplicationController
   # layout 'pc_home',only:[:index]
   #layout 'zhihuishequ',only:[:huishequ]
   # layout 'about_us',only:[:about_us]
    def index
      # 判断手机访问还是pc端
      user_agent_string=request.user_agent
      ua = AgentOrange::UserAgent.new(user_agent_string)
      device = ua.device
      user_agent=device.is_mobile?
      # if user_agent
      #   #user_agent=true则是手机访问
      #   redirect_to controller: :mobile_home,action: :home and return
      # end
      render template: 'home/index', layout: 'pc_home'
    end

   def huishequ

   end

   def huishenghuo

   end

  def huibangong

  end
  def huigouwu

  end

  def about_us
      @events=Event.all().order(event_date: :asc)
      @events_date=Event.select(:event_date).order(event_date: :asc)

      render template: 'home/about_us', layout: 'about_us'
  end

  def join_us

  end

  def app

  end

    def yikatong
      render text:"<h1>一卡通说明--网页版</h1>"
    end
end
