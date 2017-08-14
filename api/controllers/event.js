var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

  retrieveAllEvents : function(req, res) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);
      db.getAllRecordsFromTable('events').done(function(results) {
        let eventList = '';
        for (let event of results) {
          eventList += event.id + ' ' + event.name + ' ' + event.description + '\n';
        }
        resolve(eventList);
      });
    });
  }

};
