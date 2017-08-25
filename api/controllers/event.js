var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

// *** Create ***

  create : function(name, description, adminId, maxGiftPrice, 
                    street, city, state, zipcode,
                    dateOccurs, dateCreated) {

    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      // The following variables allow for sanitizing the input for
      // the forthcoming 'safe query'
      let insertStmt = " INSERT INTO "
                     + " events(name, description, admin_id, max_gift_price"
                     + "      , loc_street, loc_city, loc_state, loc_zipcode"
                     + "      , occurs, created)"
                     + " VALUES"
                     + "       ($name, $description, $adminId, $maxGiftPrice"
                     + "      , $street, $city, $state, $zipcode"
                     + "      , $dateOccurs, $dateCreated)"
      let queryParams = { $name         : name
                        , $description  : description
                        , $adminId      : adminId
                        , $maxGiftPrice : maxGiftPrice
                        , $street       : street
                        , $city         : city
                        , $state        : state
                        , $zipcode      : zipcode
                        , $dateOccurs   : dateOccurs
                        , $dateCreated  : dateCreated
                        };

      // Test Case - should fail with error 409 (conflict)
      // insertStmt = "INSERT INTO events(id) VALUES ($id)";
      // queryParams = { $id : 1 };
      db.executeSafeQuery(insertStmt, queryParams)
        .done(function(result) {
          resolve(result);

        }, function(err) {
          reject(err);
        });
    });
  }

, addUser : function(eventId, userId) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      let insertStmt = " INSERT INTO "
                     + "   event_users(event_id, user_id)"
                     + " VALUES"
                     + "   ($eventId, $userId)";
      let queryParams = { $eventId : eventId
                        , $userId  : userId
                        };

      db.executeSafeQuery(insertStmt, queryParams)
        .done(function(result) {
          resolve(result);

        }, function(err) {
          reject(err);
        });
    });
  }

, addGiverReceiverPair : function(eventId, pair) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      let insertStmt = " INSERT INTO "
                     + "   randomized_pairs(event_id, giver_id, receiver_id)"
                     + " VALUES "
                     + "   ($eventId, $giverId, $receiverId)";

      let queryParams = { $eventId    : eventId
                        , $giverId    : pair[0]
                        , $receiverId : pair[1]
                        };

      db.executeSafeQuery(insertStmt, queryParams)
        .done(function(result) {
          resolve(result);

        }, function(err) {
          reject(err);
        });
    });
}


, setGiverReceiverPairs : function(eventId, pairs) {
  // pairs should be an array of two elements of form
  // [ giver_id, receiver_id ]
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      // first, delete any previous results for this event and insert new pairs
      let delStmt = " DELETE FROM randomized_pairs "
                  + "   WHERE event_id = ?;";
      db.executeSafeQuery(delStmt, eventId)
        .done(function(result) {
          // insert pairs into table of randomized pairs
          
          let paramPlaceholders = [];

          for (let i = 0; i < pairs.length; i++) {
            // parameter format: (event_id, giver_id, receiver_id)
            paramPlaceholders.push('(?, ?, ?)');
          }

          paramPlaceholdersStr = paramPlaceholders.join(',');

          let insertStmt = " INSERT INTO"
                         + "   randomized_pairs(event_id, giver_id, receiver_id)"
                         + " VALUES "
                         + paramPlaceholdersStr;

          let paramValues = [];
          for (pair of pairs) {
            paramValues.push(eventId, pair[0], pair[1]);
          }

          db.executeSafeQuery(insertStmt, paramValues)
            .done(function(result) {
              resolve(result);

            }, function(err) {
              reject(err);
            });

        }, function(err) {
          reject(err);
        });
    });
  }


// *** Retrieve ***

, retrieveAll : function() {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      db.getAllRecordsFromTable('events')
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err)
      });
    });
  }

, retrieveById : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      db.executeQuery('SELECT * FROM events WHERE id = ' + id)
      .done(function(results) {
        resolve(results[0]);

      }, function(err) {
        reject(err)
      });
    });
  }

, retrieveEventUsers : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      let eventUsersSql 
          = 'SELECT'
          + ' users.id AS id, first_name, last_name, email_addr, events.id AS eid'
          + ' FROM'
          + '   (users INNER JOIN event_users'
          + '     ON users.id  = event_users.user_id'
          + '   INNER JOIN events'
          + '     ON events.id = event_users.event_id)'
          + ' WHERE'
          + '   eid = ' + id
          ;
      db.executeQuery(eventUsersSql)
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err);
      });
    });
  }

, retrieveRandomizedPairs(eventId) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      randPairsQuery = 
         "SELECT r.event_id"
       + ", u1.id         AS giver_id"
       + ", u1.first_name AS giver_first_name"
       + ", u1.last_name  AS giver_last_name"
       + ", u1.email_addr AS giver_email_addr"

       + ", u2.id         AS receiver_id"
       + ", u2.first_name AS receiver_first_name"
       + ", u2.last_name  AS receiver_last_name"
       + ", u2.email_addr AS receiver_email_addr"

       + " FROM randomized_pairs r"
       + "      LEFT JOIN users u1 ON (r.giver_id    = u1.id)"
       + "      LEFT JOIN users u2 ON (r.receiver_id = u2.id)"
       + " WHERE r.event_id = " + eventId
       ;

      db.executeQuery(randPairsQuery)
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err)
      });
    });
  }

, retrieveRandomizedPair(eventId, giverId) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      randPairsQuery = 
         "SELECT r.event_id"
       + ", u1.id         AS giver_id"
       + ", u1.first_name AS giver_first_name"
       + ", u1.last_name  AS giver_last_name"
       + ", u1.email_addr AS giver_email_addr"

       + ", u2.id         AS receiver_id"
       + ", u2.first_name AS receiver_first_name"
       + ", u2.last_name  AS receiver_last_name"
       + ", u2.email_addr AS receiver_email_addr"

       + " FROM randomized_pairs r"
       + "      LEFT JOIN users u1 ON (r.giver_id    = u1.id)"
       + "      LEFT JOIN users u2 ON (r.receiver_id = u2.id)"
       + " WHERE r.event_id = " + eventId + " AND u1.id = " + giverId
       ;

      db.executeQuery(randPairsQuery)
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err)
      });
    });
  }

, hasBeenRandomized : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      let eventUsersSql 
          = 'SELECT randomized'
          + ' FROM events'
          + ' WHERE id = ' + id
          ;
      db.executeQuery(eventUsersSql)
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err);
      });
    });
  }

, messagesHaveBeenSent : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      let eventUsersSql 
          = 'SELECT messages_sent'
          + ' FROM events'
          + ' WHERE id = ' + id
          ;
      db.executeQuery(eventUsersSql)
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err);
      });
    });
  }


// *** Update *** 

, updateName : function(id, name) {
    return this.updateByDbField(id, 'name', name);
  }

, updateDescription : function(id, description) {
    return this.updateByDbField(id, 'description', description);
  }

, updateAdminId : function(id, adminId) { 
    return this.updateByDbField(id, 'admin_id', adminId);
}

, updateMaxGiftPrice : function(id, maxGiftPrice) { 
    return this.updateByDbField(id, 'max_gift_price', maxGiftPrice);
  }

, updateStreet : function(id, street) { 
    return this.updateByDbField(id, 'loc_street', street);
  }

, updateCity : function(id, city) { 
    return this.updateByDbField(id, 'loc_city', city);
  }

, updateState : function(id, state) { 
    return this.updateByDbField(id, 'loc_state', state);
  }

, updateZipcode : function(id, zipcode) { 
    return this.updateByDbField(id, 'loc_zipcode', zipcode);
  }

, updateDateOccurs : function(id, dateOccurs) { 
    return this.updateByDbField(id, 'occurs', dateOccurs);
  }

, updateDateCreated : function(id, dateCreated) { 
    return this.updateByDbField(id, 'created', dateCreated);
  }

, updateRandomizedFlag : function(id, randomized) {
    return this.updateByDbField(id, 'randomized', randomized);
  }

, updateMessagesSent : function(id, messagesSent) {
    return this.updateByDbField(id, 'messages_sent', messagesSent);
  }

, updateByDbField : function(id, fieldName, value) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      updateStmt = ' UPDATE events'
                 + ' SET ' + fieldName + '=' + '$value'
                 + ' WHERE id=$id'
                 ;
      queryParams = { $value : value
                    , $id    : id }
      
      db.executeSafeQuery(updateStmt, queryParams)
        .done(function(result) {
          resolve(result);

        }, function(err) {
          reject(err);
        });
    });
  }

, updateAll : function( id
                      , name
                      , description
                      , adminId
                      , maxGiftPrice
                      , street
                      , city
                      , state
                      , zipcode
                      , dateOccurs
                      , dateCreated)
  {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      updateStmt = ' UPDATE events'
                 + ' SET'
                 + '   name           = $name'
                 + ' , description    = $description'
                 + ' , admin_id       = $adminId'
                 + ' , max_gift_price = $maxGiftPrice'
                 + ' , loc_street     = $street'
                 + ' , loc_city       = $city'
                 + ' , loc_state      = $state'
                 + ' , loc_zipcode    = $zipcode'
                 + ' , occurs         = $dateOccurs'
                 + ' , created        = $dateCreated'
                 + ' WHERE id = $id'
                 ;
      queryParams = { $id           : id
                    , $name         : name
                    , $description  : description
                    , $adminId      : adminId
                    , $maxGiftPrice : maxGiftPrice
                    , $street       : street
                    , $city         : city
                    , $state        : state
                    , $zipcode      : zipcode
                    , $dateOccurs   : dateOccurs
                    , $dateCreated  : dateCreated
                    };
      
      db.executeSafeQuery(updateStmt, queryParams)
        .done(function(result) {
          resolve(result);

        }, function(err) {
          reject(err);
        });
    });
  }


// *** Delete ***

, deleteById : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      let deleteStmt = 'DELETE FROM events WHERE id=$id';
      let queryParams = { $id : id };

      db.executeSafeQuery(deleteStmt, queryParams)
      .done(function(results) {
        resolve(results);

      }, function(err) {
        reject(err)
      });
    });
  }

};
