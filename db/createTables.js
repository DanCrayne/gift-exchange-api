var sqlite3 = require('sqlite3').verbose();
var fs      = require('fs');
var path    = require('path');

fs.readFile(path.resolve(process.cwd() + '/../') + '/db/createTables.sql', function (err, data) {
  if (err) 
    return console.log(err);

  var db = new sqlite3.Database('./giftex.db');
  var sqlQuery = data.toString();
  db.exec(sqlQuery);
});
