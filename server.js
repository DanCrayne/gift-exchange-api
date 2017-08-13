var restify = require('restify');
var server = restify.createServer();
var Promise = require('promise');
var Database = require('./api/core//Database.js');

var config = require('./config');
require('./api/core/routes')(server);

var db = new Database(config.dbPath);

db.getAllUsers().done(function(results) { 
  console.log(results); 
  });

server.listen(config.port, function() {
  console.log('%s listening on port %s', server.name, config.port);
});
