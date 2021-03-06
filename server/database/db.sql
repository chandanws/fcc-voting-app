DROP DATABASE IF EXISTS fccvotingapp;
CREATE DATABASE fccvotingapp;

\c fccvotingapp;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(80) UNIQUE,
  hash text,
  salt text
);

CREATE TABLE polls (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title varchar(80)
);

CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  name varchar(80),
  value INTEGER DEFAULT 0
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(comment_id),
  body text
);
