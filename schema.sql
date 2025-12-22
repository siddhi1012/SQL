create table user(
    id varchar(30) primary key,
    username varchar(30) unique,
    email varchar(30) unique not null,
    password varchar(30) not null
);