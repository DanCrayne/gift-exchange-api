module.exports = function(dbPath) {
  var db = require('./database.js')(dbPath);
  return db;
}
