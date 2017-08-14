var restify = require('restify');
var server = restify.createServer();
var config = require('./config');

require('./api/core/routes/routes.js')(server);

server.listen(config.port, function() {
  console.log('%s listening on port %s', server.name, config.port);
});
