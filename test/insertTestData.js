var sqlite3 = require('sqlite3').verbose();
var fs      = require('fs');

fs.readFile('insertTestData.sql', function (err, data) {
  if (err) 
    return console.log(err);

  var db = new sqlite3.Database('../db/giftex.db');
  var sqlQuery = data.toString();
  db.exec(sqlQuery);
});
