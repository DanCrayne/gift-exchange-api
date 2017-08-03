CREATE TABLE events (
  id              serial primary key
, name            varchar(50)
, description     varchar(255)
, admin_id        integer
, max_gift_price  decimal(8,2)
, loc_street      varchar(100)
, loc_city        varchar(50)
, loc_state       varchar(20)
, loc_zipcode     varchar(15)
, time_occurs     timestamp
, time_created    timestamp
);

CREATE TABLE participants (
  id              serial primary key
, first_name      varchar(35)
, last_name       varchar(35)
, email_addr      varchar(50)
, password        varchar(50)
);

CREATE TABLE event_participants (
  event_id        integer NOT NULL REFERENCES events (id)
, participant_id  integer NOT NULL REFERENCES participants (id)
, PRIMARY KEY (event_id, participant_id)
);

CREATE TABLE event_exclusions (
  event_id        integer NOT NULL REFERENCES events (id)
, participant1_id integer NOT NULL REFERENCES participants (id)
, participant2_id integer NOT NULL REFERENCES participants (id)
, PRIMARY KEY (event_id, participant1_id, participant2_id)
);

CREATE TABLE wishlist_item (
  name            varchar(50)
, event_id        integer NOT NULL REFERENCES events (id)
, participant_id  integer NOT NULL REFERENCES participants (id)
, description     text
, url             varchar(255)
, PRIMARY KEY (name, event_id, participant_id)
);
