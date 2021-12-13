CREATE TABLE  users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(300) NOT NULL
  avatar VARCHAR(300) NOT NULL
);

CREATE TABLE discussion (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  creatorId INTEGER NOT NULL,
  FOREIGN KEY (creatorId) REFERENCES users (id) ON DELETE CASCADE
  image VARCHAR(300) NOT NULL
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  dateSend TIMESTAMP,
  messageBody TEXT,
  userId INTEGER,
  discussionId INTEGER,
  FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (discussionId) REFERENCES discussion (id) ON DELETE CASCADE
);

CREATE TABLE users_discussion (
  userId INTEGER,
  discussionId INTEGER,
  PRIMARY KEY(userId, discussionId),
  FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (discussionId) REFERENCES discussion (id) ON DELETE CASCADE
);

psql \! chcp 1251
set client_encoding='win1251';
