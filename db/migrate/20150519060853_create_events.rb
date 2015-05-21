class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :event_date
      t.string :position
      t.text :content
      t.timestamps
    end
  end
end
