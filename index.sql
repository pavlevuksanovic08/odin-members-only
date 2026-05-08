create table users (
    id int primary key generated always as identity,
    first varchar(30) not null,
    last varchar(30) not null,
    username varchar(50) not null,
    password text not null,
    membership_status varchar(30)
);

create table messages (
    id int primary key generated always as identity,
    title varchar(50) not null,
    message TEXT not null,
    datetime timestamp default CURRENT_TIMESTAMP,
    userid int,
    FOREIGN key (userid) references users(id) on delete cascade
);

