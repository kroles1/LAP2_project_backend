DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    user_name varchar(100) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    user_password varchar(100) NOT NULL,
    level INT DEFAULT 1,
    exp INT DEFAULT 0,
);