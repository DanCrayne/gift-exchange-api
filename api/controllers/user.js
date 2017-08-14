var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

  retrieveAllUsers : function(req, res) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);
      db.getAllRecordsFromTable('users').done(function(results) {
        let userList = '';
        for (let user of results) {
          userList += user.id + ' ' + user.first_name + ' ' + user.last_name + '\n';
        }
        resolve(userList);
      });
    });
  }

};
