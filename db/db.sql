create database todolist;


use todolist;

create table tasks (
id INT(11) NOT NULL AUTO_INCREMENT,
    description VARCHAR(45) NOT NULL,
    completed BOOL DEFAULT 0 NOT NULL,
    folderID INT(11) DEFAULT NULL,
    PRIMARY KEY (id)
);

describe tasks;