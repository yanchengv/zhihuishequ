#encoding:utf-8
namespace :db do
  task seed: :environment do
    admin_data
  end
end

def admin_data
  # User.delete_all
  @admin1=User.create(
      name: 'admin',
      email:'123456@qq.com',
      password:'123456',
      is_admin:true
  )

end