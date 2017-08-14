var Promise = require('promise')
var sqlite3 = require('sqlite3').verbose();

// constructor
function Database(path) {
  this.path = path;

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
