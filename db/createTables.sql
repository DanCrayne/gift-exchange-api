/* From https://sqlite.org/autoinc.html
   The AUTOINCREMENT keyword imposes extra CPU, memory, disk space, and disk
   I/O overhead and should be avoided if not strictly needed. It is usually 
   not needed. 
*/

CREATE TABLE IF NOT EXISTS events (
  id              integer primary key
, name            varchar(50)
, description     text
, admin_id        integer NOT NULL REFERENCES users (id)
, max_gift_price  decimal(8,2)
, loc_street      varchar(100)
, loc_city        varchar(50)
, loc_state       varchar(20)
, loc_zipcode     varchar(15)
, occurs          timestamp
, created         timestamp
);

CREATE TABLE IF NOT EXISTS users (
  id              integer primary key
, first_name      varchar(35)
, last_name       varchar(35)
, email_addr      varchar(50)
, password        varchar(50)
);

CREATE TABLE IF NOT EXISTS event_users (
  event_id        integer NOT NULL REFERENCES events (id)
, user_id         integer NOT NULL REFERENCES users (id)
, PRIMARY KEY (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS event_exclusions (
  event_id        integer NOT NULL REFERENCES events (id)
, user1_id        integer NOT NULL REFERENCES users (id)
, user2_id        integer NOT NULL REFERENCES users (id)
, PRIMARY KEY (event_id, user1_id, user2_id)
);

CREATE TABLE IF NOT EXISTS wishlist_item (
  name            varchar(50)
, event_id        integer NOT NULL REFERENCES events (id)
, user_id         integer NOT NULL REFERENCES users (id)
, description     text
, url             varchar(255)
, PRIMARY KEY (name, event_id, user_id)
);
