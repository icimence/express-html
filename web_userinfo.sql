drop database if exists web;
create database if not exists web;
use web;
create table if not exists userinfo(username char(255),password char(255));
insert into web.userinfo  (username, password)
values  ('test', '$argon2i$v=19$m=4096,t=3,p=1$cqaZw0umGcEIlFQ9AAhQcw$Mj4exo85F1Fy614Y/DQtTN4iavgzNU7IvhinZlW9xKg'),
        ('icimence', '$argon2i$v=19$m=4096,t=3,p=1$Bxa4x4+YwNIf2QzTIzUwVw$6g7uryLpCVD3hqv635O3H7oxw7npw9fSKJtpO8Z1Mvc');