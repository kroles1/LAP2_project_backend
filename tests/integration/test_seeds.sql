TRUNCATE users, habits RESTART IDENTITY;


INSERT INTO users (user_name, email, user_password) 
VALUES
(
    'test1',
    'test@test.com',
    'testpassword'
);

INSERT INTO habits (name, difficulty, frequency, number_of_rep, user_id) 
VALUES
(
    'jogging', 
    'easy', 
    'd',
    1,
    1
);
