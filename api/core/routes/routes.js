var restify = require('restify');
var config  = require(process.cwd() + '/config');
var controllers = require(config.controllersPath);

module.exports = function(server) {
  require('./preHandlers.js')(server, restify);
  require('./postHandlers.js')(server, restify);

  server.get('/users', function(req, res, next) {
    controllers.user.retrieveAllUsers().done(function(results) {
      res.send(results);
    });
  });

  server.get('/events', function(req, res, next) {
    controllers.event.retrieveAllEvents().done(function(results) {
      res.send(results);
    });
  });

}
