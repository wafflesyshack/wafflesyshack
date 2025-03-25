CREATE TABLE IF NOT EXISTS users_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    registration_date DATE DEFAULT (DATE('now'))
);

CREATE TABLE IF NOT EXISTS goals_table (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    goal_name TEXT NOT NULL,
    goal_quantity INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id)
       REFERENCES users_table (id) 
);

CREATE TABLE IF NOT EXISTS achievements_table (
    achievement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal_id INTEGER NOT NULL,
    achievement_date DATE NOT NULL,
    achievement_quantity INTEGER NOT NULL,
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
    star_light TEXT NOT NULL,
    FOREIGN KEY (achievement_id)
       REFERENCES achievements_table (achievement_id) 
);