module.exports = function(server, restify) {

  // response header settings
  server.use(function crossOrigin(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", 
                  "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    return next();
  });

  // enable access to request data in req.params
  server.use(restify.plugins.bodyParser( { mapParams : true } ));
}
