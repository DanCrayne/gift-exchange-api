var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

// *** Create ***

  create : function(firstName, lastName, email, password) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      // The following variables allow for sanitizing the input for
      // the forthcoming 'safe query'
      let insertStmt = "INSERT INTO "
                     + "users(first_name, last_name, email_addr, password) "
                     + "VALUES ($firstName, $lastName, $email, $password)";
      let queryParams = { $firstName : firstName 
                        , $lastName  : lastName
                        , $email     : email
                        , $password  : password 
                        };
      // Test Case - should fail with error 409 (conflict)
      // insertStmt = "INSERT INTO users(id) VALUES ($id)";
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
      db.getAllRecordsFromTable('users')
      .done(function(results) {
        resolve(results);
      }, function(err) {
          reject(err);
      });
    })
  }

, retrieveById : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);
      db.executeQuery('SELECT * FROM users WHERE id = ' + id)
      .done(function(results) {
        resolve(results[0]);
      }, function(err) {
        reject(err);
      });
    });
  }


// *** Update ***

, updateFirstName : function(id, firstName) {
    this.updateByDbField(id, 'first_name', firstName);
  }

, updateLastName : function(id, lastName) {
    this.updateByDbField(id, 'last_name', lastName);
  }

, updateEmail : function(id, email) {
    this.updateByDbField(id, 'email', email);
  }

, updatePassword : function(id, password) {
    this.updateByDbField(id, 'password', password);
  }

, updateByDbField : function(id, fieldName, value) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      updateStmt = ' UPDATE users'
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

, updateAll : function(id, firstName, lastName, email, password) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);

      updateStmt = ' UPDATE users'
                 + ' SET'
                 + '   first_name = $firstName'
                 + ' , last_name  = $lastName'
                 + ' , email_addr = $email'
                 + ' , password   = $password'
                 + ' WHERE id = $id'
                 ;
      queryParams = { $id        : id
                    , $firstName : firstName
                    , $lastName  : lastName
                    , $email     : email
                    , $password  : password
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

      let deleteStmt = 'DELETE FROM users WHERE id=$id';
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
