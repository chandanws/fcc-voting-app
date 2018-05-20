DROP DATABASE IF IT EXISTS fccVotingApp;
CREATE DATABASE fccVotingApp;

\c fccVotingApp;

CREATE TABLE users (
  id INTEGER SERIAL PRIMARY KEY,
  username varchar(80) UNIQUE,
  hash text,
  salt text
);

CREATE TABLE polls (
  id INTEGER SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  title varchar(80)
);

CREATE TABLE options (
  
)