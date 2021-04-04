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

create table posts (
    post_id serial not null primary key,
    post_description text not null,
    post_date TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    post_image_path TEXT not null,
    project_id int,
    FOREIGN KEY (project_id) REFERENCES public.projects(project_id) ON DELETE CASCADE
);

create table comments (
    comment_id serial not null primary key,
    comment_body text not null,
    comment_date TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    client_id int,
    project_id int,
    FOREIGN KEY (client_id) REFERENCES public.clients(client_id),
    FOREIGN KEY (project_id) REFERENCES public.projects(project_id) ON DELETE CASCADE
);

create user aftergardenuser with password 'aftergarden';
grant update, select, insert on users to aftergardenuser;
grant usage, select on sequence public.users_user_id_seq to aftergardenuser;