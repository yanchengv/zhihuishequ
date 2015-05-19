class EventsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  layout 'admin'
  def show

  end

  def new

  end

  def create
    event_date=params[:event][:event_date]
     position=params[:event][:position]
     content=params[:event][:content]
     @event=Event.new(event_date:event_date,position:position,content:content)
     @event.save
     flash[:flag]="保存成功！"
     redirect_to :back
  end




  def update

  end


  private
  def event_params
    params.permit(:id,:event_date,:position,:content)
  end
end
