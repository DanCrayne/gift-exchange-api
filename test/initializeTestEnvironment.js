var Promise   = require('promise');
var sqlite    = require('sqlite');
var path      = require('path');
var fs        = require('fs');
var sqlite3   = require('sqlite3').verbose();

var dbDir     = path.resolve(process.cwd() + '/../') + '/db/';
var testDir   = path.resolve(process.cwd() + '/../') + '/test/';

var db        = new sqlite3.Database(dbDir + 'giftex.db');


/* Drop all tables */
var promise = new Promise(function(resolve, reject) {
  fs.readFile(testDir + 'dropAllTables.sql', function (err, data) {
    if (err) reject(err);
    else resolve(data);
  });

}).then(function(dropAllTablesSql) {
  return new Promise(function(resolve, reject) {
    db.exec(dropAllTablesSql.toString(), function(err) {
      if (err) reject(err);
      else resolve(db);
    }); 
  })


/* Create all tables */
}).then(function() {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbDir + 'createTables.sql', function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });

}).then(function(createTablesSql) {
  return new Promise(function(resolve, reject) {
    db.exec(createTablesSql.toString(), function(err) {
      if (err) reject(err);
      else resolve(db);
    }); 
  })


/* Insert test data */
}).then(function() {
  return new Promise(function(resolve, reject) {
    fs.readFile(testDir + 'insertTestData.sql', function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });

}).then(function(insertTestDataSql) {
  return new Promise(function(resolve, reject) {
    db.exec(insertTestDataSql.toString(), function(err) {
      if (err) reject(err);
      else resolve(db);
    }); 
  })

}).catch(function(err) {
  console.log(err);
});
