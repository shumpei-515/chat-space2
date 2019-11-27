# README

# README

# Users テーブル
|Column|Type|Options|
|------|----|-------|
｜name｜string|null: false, unique:true|
｜e-mail｜string|null: false, unique:true|

# Association
- has_many messages
- has_many groups through groups_users
- has _many groups_users

# groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

# Association
- belongs_to :group
- belongs_to :user

# groups テーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique:true|

# Association
- has_many users through groups_users
- has_many messages
- has_many groups_users

# message テーブル
|Column|Type|Options|
|------|----|-------|
|image|string|-------|
|text|text|-------|

# Association
- message belongs_to user
- message belongs_to group