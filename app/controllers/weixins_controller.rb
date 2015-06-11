class WeixinsController < ApplicationController
  layout 'weixin'

  def index

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
  end

  def join_us

  end

  def app

  end

  def yikatong
    render text:"<h1>一卡通说明--微信版</h1>"
  end
end
