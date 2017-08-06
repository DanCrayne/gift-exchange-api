module.exports = function database(dbPath) {

  var dbUtility = require('./dbUtility.js')(dbPath);
  var db = {};
  db.path = dbPath;
  db.results = [];

  db.getAllEvents = function() {
    db.results = require('./dbUtility.js')(dbPath).getAllRecords('events');
    console.log(db.results);
  }

  db.getAllUsers = function() {
    dbUtility.getAllRecords('users');
  }

  db.getAllWishListItems = function() {
    dbUtility.getAllRecords('wishlist_item');
  }

  db.getAllEventUsers = function() {
    dbUtility.getAllRecords('event_users');
  }

  db.getAllEventExclusions = function() {
    dbUtility.getAllRecords('event_exclusions');
  }

  return db;
}
