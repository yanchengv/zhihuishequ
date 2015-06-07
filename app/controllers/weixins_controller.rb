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
end
