CREATE TABLE  users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(300) NOT NULL
);

CREATE TABLE roles (
  id SMALLSERIAL PRIMARY KEY,
  status VARCHAR(25) NOT NULL
);

CREATE TABLE discussion (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  creatorId INTEGER NOT NULL,
  FOREIGN KEY (creatorId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  dateSend TIMESTAMP,
  messageBody VARCHAR(300),
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

CREATE TABLE users_roles (
    userId INTEGER,
    rolesId INTEGER,
    PRIMARY KEY(userId, rolesId),
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (rolesId) REFERENCES roles (id) ON DELETE CASCADE
);

INSERT INTO roles (status) values ('участник');
INSERT INTO roles (status) values ('создатель');
Подумай о том как взаимодействуют users_discussion и users_roles