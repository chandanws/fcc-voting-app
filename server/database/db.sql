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
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  title varchar(80)
);

CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  poll_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name varchar(80),
  value INTEGER DEFAULT 0
);

INSERT INTO users (username, hash, salt) VALUES
  ('admin', 'pass', 'salt');