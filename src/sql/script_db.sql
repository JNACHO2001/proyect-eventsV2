show databases;
use miapp1_events;
drop database  miapp1_events;
create database miapp1_events;


create table roles(
Id int auto_increment primary key,
name varchar(100) unique 
);

create table users (
Id int auto_increment primary key ,
fullname varchar(100),
email varchar(100) unique,
password varchar(100),
confirm_password varchar(100),
id_role int,
foreign key (id_role) references roles(Id) 

);
create table events(
Id int auto_increment primary key,
titulo varchar(100),
descripcion text,
fecha date,
capacidad int
);

create table participaciones (
Id int auto_increment primary key,
id_user int,
id_event int,
foreign key(id_user) references users(Id),
foreign key(id_event) references events(Id)


);

show tables;

