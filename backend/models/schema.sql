-- Build Your Tables Here --
DROP DATABASE T03_Book_Club_App;

CREATE DATABASE T03_Book_Club_App;

USE T03_Book_Club_App;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL UNIQUE,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE roles_permissions (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id),
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE books(
    id INT AUTO_INCREMENT NOT NULL,
    Title VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    book_img VARCHAR(255),
    is_accepted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE reading_book(
    id INT AUTO_INCREMENT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    book_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE rooms(
    id INT AUTO_INCREMENT NOT NULL,
    description VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES users (id),
    book_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    PRIMARY KEY (id)
);

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    user_id INT,
    room_id INT,
    foreign key (user_id) references users(id),
    foreign key (room_id) references rooms(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);