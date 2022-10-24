-- -- Table: public.users

-- -- DROP TABLE IF EXISTS public.users;

-- CREATE TABLE IF NOT EXISTS public.users
-- (
--     id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
--     user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     email character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     user_password character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     level integer DEFAULT 1,
--     exp integer DEFAULT 0,
--     CONSTRAINT users_pkey PRIMARY KEY (id),
--     CONSTRAINT users_email_key UNIQUE (email),
--     CONSTRAINT users_user_name_key UNIQUE (user_name)
-- )

-- TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS public.users
--     OWNER to postgres;


-- -- Table: public.habits

-- -- DROP TABLE IF EXISTS public.habits;

-- CREATE TABLE IF NOT EXISTS public.habits
-- (
--     id integer NOT NULL DEFAULT nextval('habits_id_seq'::regclass),
--     name character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     email character varying(100) COLLATE pg_catalog."default" NOT NULL,
--     difficulty character varying COLLATE pg_catalog."default" DEFAULT 'esay'::character varying,
--     frequency character varying COLLATE pg_catalog."default" DEFAULT 'd'::character varying,
--     number_of_rep integer,
--     completed boolean DEFAULT false,
--     last_completed date,
--     streak integer DEFAULT 0,
--     CONSTRAINT habits_pkey PRIMARY KEY (id),
--     CONSTRAINT habits_email_key UNIQUE (email)
-- )

-- TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS public.habits
--     OWNER to postgres;



DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    id serial PRIMARY KEY,
    user_name varchar(100) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    user_password varchar(100) NOT NULL,
    level INT DEFAULT 1,
    exp INT DEFAULT 0
	);


DROP TABLE IF EXISTS public.habits;
CREATE TABLE habits (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    difficulty varchar,
    frequency varchar DEFAULT 'd',
    number_of_rep INT DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    last_completed DATE DEFAULT NULL ,
    streak INT DEFAULT 0,
    user_id INT NOT NULL
);


