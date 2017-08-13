var Promise = require('promise')
var sqlite3 = require('sqlite3').verbose();

// constructor
function Database(path) {
  this.path = path;

  this.getAllEvents = function() {
    return this.getAllRecordsFromTable('events');
  };

  this.getAllUsers = function() {
    return this.getAllRecordsFromTable('users');
  };

  this.getAllWishListItems = function() {
    return this.getAllRecordsFromTable('wishlist_item');
  }

  this.getAllEventUsers = function() {
    return this.getAllRecordsFromTable('event_users');
  }

  this.getAllEventExclusions = function() {
    return this.getAllRecords('event_exclusions');
  }

  this.getAllRecordsFromTable = function(tableName) {
    return new Promise(function(resolve, reject) {
      let query = 'SELECT * FROM ' + tableName;
      let sqliteDb = new sqlite3.Database(path);

      sqliteDb.all(query, function(err, rows) {
        if (err)  { reject(err); }
        else      { resolve(rows); }
      })

      sqliteDb.close();
    });
  };

};

module.exports = Database;
