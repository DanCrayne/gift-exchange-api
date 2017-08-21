var restify = require('restify');
var config  = require(process.cwd() + '/config');
var controllers = require(config.controllersPath);

// see http://www.restapitutorial.com/lessons/httpmethods.html
// for a description of REST responses

// TODO: break this into modules for each element of CRUD handling

module.exports = function(server) {
  require('./preHandlers.js')(server, restify);
  require('./postHandlers.js')(server, restify);


  // *** Create ***

  server.post('/users', function(req, res, next) {
    controllers.user.create( req.params.firstName
                           , req.params.lastName
                           , req.params.email
                           , req.params.password
                           )
      .done(function(result) {
        res.send(201, '/users/' + result.lastID);

      }, function(err) {
        if (err.errno === 19) // conflict
          res.send(409, 'user already exists');

        else 
          res.send(404, 'cannot create user');

      });

    return next();
  });

  server.post('/events', function(req, res, next) {
    controllers.user.create( req.params.name
                           , req.params.description
                           , req.params.adminId
                           , req.params.maxGiftPrice
                           , req.params.street
                           , req.params.city
                           , req.params.state
                           , req.params.zipcode
                           , req.params.dateOccurs
                           , req.params.dateCreated
                           )
      .done(function(result) {
        res.send(201, '/events/' + result.lastID);

      }, function(err) {
        if (err.errno === 19) // conflict
          res.send(409, 'event already exists');

        else 
          res.send(404, 'cannot create event');

      });

    return next();
  });


  // *** Retrieve ***

  server.get('/users', function(req, res, next) {
    controllers.user.retrieveAll()
      .done(function(results) {
        res.send(200, results);

      }, function(err) {
        res.send(404, 'could not retrieve users');

      });

    return next();
  });

  server.get('/users/:id', function(req, res, next) {
    controllers.user.retrieveById(req.params.id)
      .done(function(result) {
        res.send(200, result);
      
      }, function(err) {
        res.send(404, 'could not retrieve user ' + req.params.id);

      });

    return next();
  });

  server.get('/events', function(req, res, next) {
    controllers.event.retrieveAll()
      .done(function(results) {
        res.send(200, results);

        }, function(err) {
          res.send(404, 'could not retrieve events');

        });

    return next();
  });

  server.get('/events/:id', function(req, res, next) {
    controllers.event.retrieveById(req.params.id)
      .done(function(result) {
        res.send(200, result);

        }, function(err) {
          res.send(404, 'could not retrieve event');

        });

    return next();
  });

  server.get('/events/:id/users', function(req, res, next) {
    controllers.event.retrieveEventUsers(req.params.id)
      .done(function(results) {
        console.log(results);
        res.send(200, results);

        }, function(err) {
          console.log(err);
          res.send(404, 'could not retrieve event users');

        });

    return next();
  });


  // *** Update / Replace ***
  server.put('/users/:id', function(req, res, next) {
  });

  server.put('/events/:id', function(req, res, next) {
  });


  // *** Update / Modify ***
  server.patch('/users/:id', function(req, res, next) {
  });

  server.patch('/events/:id', function(req, res, next) {
  });


  // *** Delete ***

  server.del('/users/:id', function(req, res, next) {
  });

  server.del('/events/:id', function(req, res, next) {
  });

}
