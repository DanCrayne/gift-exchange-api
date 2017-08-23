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

      // The following variables allow for sanitizing the input for
      // the forthcoming 'safe query'
      let insertStmt = " INSERT INTO "
                     + "   event_users(event_id, user_id)"
                     + " VALUES"
                     + "   ($eventId, $userId)";
      let queryParams = { $eventId : eventId
                        , $userId  : userId
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
