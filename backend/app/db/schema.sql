CREATE TABLE IF NOT EXISTS users_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    registration_date DATE DEFAULT (DATE('now'))
);



CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- id を user_id に変更
    uid TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE, 
    provider TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE,
    token TEXT,
    expires_at DATETIME
    );

CREATE TABLE IF NOT EXISTS topics_table ( 
    topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL, -- ユーザーIDを追加
    topic_name TEXT NOT NULL,
    start_date DATE NOT NULL, 
    end_date DATE NOT NULL,
    FOREIGN KEY (uid) REFERENCES users (uid) -- 外部キー制約を追加
);

CREATE TABLE IF NOT EXISTS goals_table (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    uid TEXT NOT NULL,
    goal_name TEXT NOT NULL, 
    topic_id INTEGER NOT NULL,
    goal_quantity INTEGER,
    goal_detail TEXT, 
    start_date DATE NOT NULL, 
    end_date DATE NOT NULL, 
    goal_unit TEXT,
    FOREIGN KEY (topic_id) 
        REFERENCES topics_table (topic_id),
    FOREIGN KEY (uid)
        REFERENCES users (uid) -- uid を外部キー制約に追加
);

CREATE TABLE IF NOT EXISTS achievements_table (
    achievement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal_id INTEGER NOT NULL,
    achievement_date DATE NOT NULL,
    achievement_quantity INTEGER NOT NULL,
    achievement_detail TEXT,
    FOREIGN KEY (goal_id)
       REFERENCES goals_table (goal_id) 
);

CREATE TABLE IF NOT EXISTS stars_table (
    star_id INTEGER PRIMARY KEY AUTOINCREMENT,
    achievement_id INTEGER NOT NULL,
    star_type TEXT NOT NULL,
    star_position_x INTEGER NOT NULL,
    star_position_y INTEGER NOT NULL,
    star_color TEXT NOT NULL,
    star_light INTEGER NOT NULL,
    FOREIGN KEY (achievement_id)
       REFERENCES achievements_table (achievement_id) 
);