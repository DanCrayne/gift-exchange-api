INSERT INTO users (first_name, last_name, email_addr) VALUES ('Johnnie', 'Howard', 'Johnnie.Howard@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Lillian', 'Poole', 'Lillian.Poole@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Kelly', 'Mathis', 'Kelly.Mathis@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Homer', 'Robbins', 'Homer.Robbins@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Nicole', 'Flowers', 'Nicole.Flowers@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Nicholas', 'Berry', 'Nicholas.Berry@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Arturo', 'Rodriquez', 'Arturo.Rodriquez@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Aubrey', 'Watson', 'Aubrey.Watson@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Dale', 'Tyler', 'Dale.Tyler@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Caleb', 'Reynolds', 'Caleb.Reynolds@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Ellis', 'Hamilton', 'Ellis.Hamilton@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Monica', 'Turner', 'Monica.Turner@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Stacey', 'Jordan', 'Stacey.Jordan@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Bradford', 'Nichols', 'Bradford.Nichols@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Cory', 'Fowler', 'Cory.Fowler@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Tasha', 'Chambers', 'Tasha.Chambers@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Denise', 'Hampton', 'Denise.Hampton@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Virginia', 'Ortega', 'Virginia.Ortega@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Kerry', 'Garrett', 'Kerry.Garrett@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Bessie', 'Powell', 'Bessie.Powell@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Jeffrey', 'Little', 'Jeffrey.Little@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Tyler', 'Reese', 'Tyler.Reese@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Pablo', 'Williamson', 'Pablo.Williamson@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Lucy', 'Ellis', 'Lucy.Ellis@example.com');
INSERT INTO users (first_name, last_name, email_addr) VALUES ('Spencer', 'Moran', 'Spencer.Moran@example.com');

INSERT INTO events (name, description, admin_id, loc_street, loc_city, loc_state, loc_zipcode, occurs, created) 
       VALUES
       ('Gift Exchange', 'Just some generic gift exchange at that one person''s house. Make sure to bring a dish along with your gift.',
        1, '1234 Fake St.', 'Portland', 'OR', '97202', '2017-10-17 19:00:00-00', '2017-09-29 07:37:16-08'
       );

INSERT INTO events (name, description, admin_id, loc_street, loc_city, loc_state, loc_zipcode, occurs, created) 
       VALUES
       ('xmas 2017', 'xmas gift exchange at Lillian''s house. Bring any pudding as long as that pudding is plum.',
        2, '919 Main St.', 'Oregon City', 'OR', '97045', '2017-12-25 18:30:00-00', '2017-11-29 10:40:16-09'
       );

INSERT INTO event_users (event_id, user_id) VALUES (1, 1);
INSERT INTO event_users (event_id, user_id) VALUES (1, 2);
INSERT INTO event_users (event_id, user_id) VALUES (1, 3);
INSERT INTO event_users (event_id, user_id) VALUES (1, 4);
INSERT INTO event_users (event_id, user_id) VALUES (1, 5);
INSERT INTO event_users (event_id, user_id) VALUES (1, 6);
INSERT INTO event_users (event_id, user_id) VALUES (1, 7);
INSERT INTO event_users (event_id, user_id) VALUES (1, 8);
INSERT INTO event_users (event_id, user_id) VALUES (1, 9);
INSERT INTO event_users (event_id, user_id) VALUES (1, 11);
INSERT INTO event_users (event_id, user_id) VALUES (1, 12);
INSERT INTO event_users (event_id, user_id) VALUES (1, 13);
INSERT INTO event_users (event_id, user_id) VALUES (1, 14);
INSERT INTO event_users (event_id, user_id) VALUES (1, 16);
INSERT INTO event_users (event_id, user_id) VALUES (1, 17);
INSERT INTO event_users (event_id, user_id) VALUES (2, 15);
INSERT INTO event_users (event_id, user_id) VALUES (2, 16);
INSERT INTO event_users (event_id, user_id) VALUES (2, 17);
INSERT INTO event_users (event_id, user_id) VALUES (2, 18);
INSERT INTO event_users (event_id, user_id) VALUES (2, 19);
INSERT INTO event_users (event_id, user_id) VALUES (2, 20);
INSERT INTO event_users (event_id, user_id) VALUES (2, 21);
INSERT INTO event_users (event_id, user_id) VALUES (2, 22);
INSERT INTO event_users (event_id, user_id) VALUES (2, 23);
INSERT INTO event_users (event_id, user_id) VALUES (2, 24);
INSERT INTO event_users (event_id, user_id) VALUES (2, 25);
INSERT INTO event_users (event_id, user_id) VALUES (2, 1);
INSERT INTO event_users (event_id, user_id) VALUES (2, 5);

INSERT INTO event_exclusions (event_id, user1_id, user2_id) VALUES (1, 1, 2);
INSERT INTO event_exclusions (event_id, user1_id, user2_id) VALUES (1, 2, 3);
INSERT INTO event_exclusions (event_id, user1_id, user2_id) VALUES (1, 5, 7);
INSERT INTO event_exclusions (event_id, user1_id, user2_id) VALUES (2, 20, 22);
INSERT INTO event_exclusions (event_id, user1_id, user2_id) VALUES (2, 17, 18);
INSERT INTO event_exclusions (event_id, user1_id, user2_id) VALUES (2, 16, 19);
