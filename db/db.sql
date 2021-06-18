create database todolist;
use todolist;

create table tasks (
id INT(11) NOT NULL AUTO_INCREMENT,
    description VARCHAR(45) NOT NULL,
    completed BOOL DEFAULT 0 NOT NULL,
    folderID INT(11) DEFAULT NULL,
    PRIMARY KEY (id)
);
INSERT INTO tasks values 
	(1, 'Go to the mall', 0, null),
    (2, 'Study', 0, null),
    (3, 'Call Susan', 0, null)
;
select * from tasks;


create table folders (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO folders (name) values ('School');
INSERT INTO folders (name) values ('Work');
select * from folders;