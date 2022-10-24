DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    difficulty varchar DEFAULT 'esay',
    frequency varchar DEFAULT 'd'
    number_of_rep INT DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    last_completed DATE ,
    streak INT DEFAULT 0,
);
