class EventsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :is_login
  layout 'admin'

  def show
    @events=nil?
    @events=Event.order( "event_date ASC")

  end

  def new

  end

  def create
      event_date=params[:event][:event_date]
     # position=params[:event][:position]
     content=params[:event][:content]
     # @event=Event.where(event_date: event_date).first
     # if  @event.nil?
     #   @event=Event.new(event_date:event_date,content:content)
     #   @event.save
     # else
     #   @event.update_attributes(content:content)
     # end
      @event=Event.new(event_date:event_date,content:content)
      @event.save
     flash[:flag]="保存成功！"
     redirect_to controller: :events,action: :show
  end




  def show_update
    @event=Event.where(id:params[:id]).first
    render template: 'events/update'
  end

  def update
      event_date=params[:event][:event_date]
      content=params[:event][:content]
      @event=Event.where(id:params[:id]).first
      # @event=Event.where(event_date: event_date).first
      # if  @event.nil?
      #   @event=Event.new(event_date:event_date,content:content)
      #   @event.save
      # else
      #   @event.update_attributes(event_date:event_date,content:content)
      # end
      @event.update_attributes(event_date:event_date,content:content)
      flash[:flag]="保存成功！"
      redirect_to controller: :events,action: :show
  end

  def destroy
    @event=Event.where(id:params[:id]).first
    @event.destroy
     redirect_to :back
  end
  private
  def event_params
    params.permit(:id,:event_date,:position,:content)
  end

  def is_login
    unless signed_in?
      redirect_to controller: :admins ,action: :login
    end

  end
end
