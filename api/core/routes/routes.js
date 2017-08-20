var restify = require('restify');
var config  = require(process.cwd() + '/config');
var controllers = require(config.controllersPath);

module.exports = function(server) {
  require('./preHandlers.js')(server, restify);
  require('./postHandlers.js')(server, restify);

  // TODO: return 404 not found upon error for all get routes

  server.get('http://localhost:8080/users', function(req, res, next) {
    controllers.user.retrieveAll().done(function(results) {
      res.send(results);
      return next();
    });
  });

  server.get('/users/:id', function(req, res, next) {
    controllers.user.retrieveById(req.params.id).done(function(result) {
      res.send(result);
      return next();
    });
  });

  server.post('/users', function(req, res, next) {
    // POST
    // 201 success
    // 404 not found
    // 409 conflict (already exists)
    controllers.user.create( req.params.firstName
                           , req.params.lastName
                           , req.params.email
                           , req.params.password
                           )
      .done(function(result) {
        res.send(201, { success : true
                      , message : 'created new user'
                      });
      }, function(err) {
        res.send(404, { success : false
                      , message : 'could not create user'
                      });
      });

    return next();
  });

  server.get('/events', function(req, res, next) {
    controllers.event.retrieveAll().done(function(results) {
      res.send(results);
      return next();
    });
  });

  server.get('/events/:id', function(req, res, next) {
    controllers.event.retrieveById(req.params.id).done(function(result) {
      res.send(result);
      return next();
    });
  });

}
