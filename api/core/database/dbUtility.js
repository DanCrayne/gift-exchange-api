var sqlite3 = require('sqlite3').verbose();

module.exports = function dbUtility(dbPath) {
  var dbUtility = {};

  dbUtility.getAllRecords = function(tableName) {
    var db = new sqlite3.Database(dbPath);
    query = 'SELECT * FROM ' + tableName;

    db.all(query, function(err, rows) {
      console.log(rows);
      return rows;
    });

    db.close();
  }

  return dbUtility;
}
