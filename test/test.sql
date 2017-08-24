SELECT r.event_id
     , u1.id, u1.first_name, u1.last_name, u1.email_addr
     , u2.id, u2.email_addr, u2.last_name, u2.email_addr
  FROM randomized_pairs r 
       LEFT JOIN users u1 ON (r.giver_id    = u1.id) 
       LEFT JOIN users u2 ON (r.receiver_id = u2.id);

SELECT r.event_id , u1.id, u1.first_name, u1.last_name, u1.email_addr , u2.id, u2.email_addr, u2.last_name, u2.email_addr FROM randomized_pairs r LEFT JOIN users u1 ON (r.giver_id    = u1.id) LEFT JOIN users u2 ON (r.receiver_id = u2.id);
