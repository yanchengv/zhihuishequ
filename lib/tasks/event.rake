#encoding:utf-8
namespace :db do
  task seed: :environment do
    event_data
  end
end

def event_data
  Event.delete_all
  # t.string :event_date
  # t.string :position
  # t.text :content
  @event1=Event.create(
      event_date: '2013-01',
      content:'智慧城市概念确立'

  )
  @event2=Event.create(
      event_date: '2014-04',
      content:'智慧城市整体解决构架方案落地'

  )
  @event3=Event.create(
      event_date: '2014-05',
      content:'1.云南首次主办智慧城市体验展@#2.15日，IBM、华为正式签约广福城，落地智慧城市'

  )
  @event4=Event.create(
      event_date: '2014-06',
      content:'智慧“云商务”产品推出'

  )
  @event5=Event.create(
      event_date: '2014-10',
      content:'1.1日，彩立方筹备组正式成立，核心团队就位@#2.智慧社区一卡通内测启动'

  )
  @event6=Event.create(
      event_date: '2014-12',
      content:'产品线模型建成'

  )
  @event7=Event.create(
      event_date: '2015-01',
      content:'智慧社区整体解决方案内部测试通过'

  )
  @event8=Event.create(
      event_date: '2015-02',
      content:'骨干团队建设启动'

  )
  @event9=Event.create(
      event_date: '2015-03',
      content:'16日，彩立方数据科技公司正式成立'

  )
  @event10=Event.create(
      event_date: '2015-04',
      content:'1.彩立方骨干团队到位@#2.施耐德授牌《微模块数据中心》@#3.与英国驻华领事馆进行智慧安全进行洽谈'

  )
  @event11=Event.create(
      event_date: '2015-05',
      content:'参加华为全国推广大会，作为分会场主讲嘉宾进行《智慧社区方案解决》主题演讲'

  )
  @event12=Event.create(
      event_date: '2015-06',
      content:'1.应邀参加昆明南博会智慧社区展厅活动@#2.应邀参加施耐德全国推广大会，作为企业级IDC应用典范进行宣传'

  )
end