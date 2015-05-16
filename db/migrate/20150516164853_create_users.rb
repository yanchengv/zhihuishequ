class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest,null: false, :default => "123456"
      t.string :phone
      t.string :email
      t.string :gender
      t.string :address
      t.date :birthday

      t.timestamps
    end
  end
end
