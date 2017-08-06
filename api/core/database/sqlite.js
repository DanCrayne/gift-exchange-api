var sqlite3 = require('sqlite3').verbose();

// TODO: add database file if it doesn't exist
var db = new sqlite3.Database('db/giftex.db');

var database = require(‘./config/database’);
