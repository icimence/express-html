drop database if exists web;
create database if not exists web;
use web;
create table if not exists userinfo(username char(255),password char(255));
insert into web.userinfo  (username, password)
values  ('test', '$argon2i$v=19$m=4096,t=3,p=1$cbchndlJ60wEb3vIqUeq8g$X4CD6XVzb6xIsP6N7j8rVcJiiJj9gSgAz3zWpZzCL8M'),
        ('test2', '$argon2i$v=19$m=4096,t=3,p=1$2u/30tLO4aKR9U9e2VGfXA$axvy3fd0UHQArrseKRJKt/e9BStjhOMV0dBBOz9hguc'),
        ('test3', '$argon2i$v=19$m=4096,t=3,p=1$U0RpKQmfpY9Kfsj3GmASAA$l6j9W83OaypKAvf6ne4qSBs2W6NLoqk+jEoVpmR7KAw');