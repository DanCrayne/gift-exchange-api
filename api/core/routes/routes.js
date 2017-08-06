var restify = require('restify');

module.exports = function(server) {
  require('./preHandlers.js')(server, restify);
  require('./postHandlers.js')(server, restify);

  // routes go here
  server.get('/', function(req, res, next) {
    res.send('Welcome to the REST API!');
  });
}

