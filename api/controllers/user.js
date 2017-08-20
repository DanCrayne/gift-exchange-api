var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

  // TODO: Add error handling on promises

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
      // Test Case - should fail
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

, updateFirstName : function(id, newFirstName) {
    this.updateByProperty(id, 'firstName', newFirstName);
  }

, updateLastName : function(id, newLastName) {
  }

, updateEmail : function(id, newEmail) {
  }

, updatePassword : function(id, newPassword) {
  }

, updateByProperty : function(id, property, value) {

  // ...
  }

, delete : function(id) {
  }

};
