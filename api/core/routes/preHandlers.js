module.exports = function(server, restify) {
  // deal with curl's 'connection keep-alive' idiosyncrasy 
  // (see http://restify.com/docs/home/)
  server.pre(restify.plugins.pre.userAgentConnection());
}
