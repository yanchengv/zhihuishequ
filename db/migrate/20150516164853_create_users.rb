class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest,null: false, :default => "123456"
      t.string :phone
      t.string :email
      t.string :gender
      t.string :address
      t.boolean :is_admin,null: false, :default =>false
      t.string :remember_token
      t.date :birthday

      t.timestamps
    end
    add_index :users, :remember_token
  end
end
