drop database if exists miapp1_events;
create database miapp1_events;
use miapp1_events;

create table roles(
  Id int auto_increment primary key,
  name varchar(100) unique not null
);

create table users (
  Id int auto_increment primary key,
  fullname varchar(100) not null,
  email varchar(100) unique not null,
  password varchar(100) not null,
  id_role int not null,
  foreign key (id_role) references roles(Id)
);

create table events(
  Id int auto_increment primary key,
  titulo varchar(100) not null,
  descripcion text,
  fecha date not null,
  capacidad int not null
);

create table participaciones (
  Id int auto_increment primary key,
  id_user int not null,
  id_event int not null,
  foreign key(id_user) references users(Id) on delete cascade on update cascade,
  foreign key(id_event) references events(Id) on delete cascade on update cascade
);


// ejemplos de insercion de datos 


insert into users (fullname, email, password, id_role) values
('Carlos Pérez', 'carlos@example.com', '12345', 1),  
('Ana Gómez', 'ana@example.com', 'abcde', 2); 
insert into roles (name) values
('Administrador'),
('Participante');

INSERT INTO events (titulo, descripcion, fecha, capacidad) VALUES
('Evento de Tecnología', 'Charla sobre nuevas tecnologías', '2025-08-20', 50),
('Reunión de Proyecto', 'Discusión de avances del proyecto', '2025-08-21', 20),
('Taller de Capacitación', 'Capacitación interna para empleados', '2025-08-22', 30);

update users set id_role =1 where email="joseesapel@gmail.com"
;
