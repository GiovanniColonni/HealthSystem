DROP TABLE IF EXISTS user;

CREATE TABLE USER (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username  TEXT UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL
);
