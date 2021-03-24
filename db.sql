create database aftergarden; /* Local database */

create table clients (
    client_id serial not null primary key,
    client_username varchar(100) not null,
    client_email varchar(100) not null,
    client_password varchar(250) not null
);

create table projects (
    project_id serial not null primary key,
    project_name varchar(25) not null,
    project_description text not null,
    project_date TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    client_id int,
    FOREIGN KEY (client_id) REFERENCES public.clients(client_id)
);

create table images (
    image_id serial not null primary key,
    image_name text not null,
    image_data varbinary(max) not null,
);

insert into public.users(user_name, user_email,user_password) values ('Jkirk', 'Kirk@mail.com','kirk1234');
insert into public.users(user_name, user_email,user_password) values ('Rclark', 'clark@mail.com','Rclark1234');
insert into public.users(user_name, user_email,user_password) values ('MBless', 'Bless@mail.com','Bless1234');
insert into public.users(user_name, user_email,user_password) values ('Lopanfer', 'Lopan@mail.com','Lopan1234');

create user aftergardenuser with password 'aftergarden';
grant update, select, insert on users to aftergardenuser;
grant usage, select on sequence public.users_user_id_seq to aftergardenuser;