var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

  retrieveAll : function() {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);
      db.getAllRecordsFromTable('events')
      .done(function(results) {
        resolve(results);
      });
    });
  }

, retrieveById : function(id) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);
      db.executeQuery('SELECT * FROM events WHERE id = ' + id)
      .done(function(results) {
        resolve(results[0]);
      });
    });
  }

};
