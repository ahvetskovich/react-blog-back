DROP DATABASE IF EXISTS react_blog;
CREATE DATABASE react_blog;

\c react_blog;

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  login text,
  password text,
  name text,
  avatar text
);
create unique index idx_name on "user" (login);

CREATE TABLE "user_token" (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES "user" (id),
  token text
);

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES "user" (id),
  title text,
  content text,
  created timestamp,
  updated timestamp,
  likes int NOT NULL DEFAULT 0
);

CREATE TABLE post_like (
  post_id int,
  user_id int,
  PRIMARY KEY (post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES post (id),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  post_id int REFERENCES post (id),
  user_id int REFERENCES "user" (id),
  content text,
  created timestamp,
  updated timestamp,
  likes int NOT NULL DEFAULT 0
);

CREATE TABLE comment_like (
  comment_id int,
  user_id int,
  PRIMARY KEY (comment_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES comment (id),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
);

INSERT INTO "user" (id, login, password, name, avatar) VALUES (1, 'test_user@gmail.com', '$2a$10$IiUZZdfcMItlw4gVTXJIjuO3gM8Do7uGF7KZztY7w25XqwvnbkDAu', 'test user', 'http://lorempixel.com/640/480');
INSERT INTO post (id, user_id, title, content, created, updated, likes) VALUES (1, 1, 'asperiores consequuntur corrupti', 'Dolor et et perferendis. Cumque aliquid commodi minus. Enim nesciunt dolorem quidem consequuntur et. Et tempore nisi aliquam sed id dolores porro fuga corrupti.', '2016-08-10 04:58:29.733', '2017-04-29 14:20:02.913', 0);
INSERT INTO comment (id, post_id, user_id, content, created, updated, likes) VALUES (1, 1, 1, 'aut saepe quis', '2017-02-06T19:53:07.212Z', '2017-02-06T19:55:07.212Z', 0);
INSERT INTO comment (id, post_id, user_id, content, created, updated, likes) VALUES (2, 1, 1, 'ut nesciunt sed', '2017-02-07T19:53:07.212Z', '2017-02-07T19:58:07.212Z', 0);

