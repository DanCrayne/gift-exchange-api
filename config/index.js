module.exports = {
  'dbFile'          : process.cwd() + '/db/giftex.db'
, 'dbController'    : process.cwd() + '/api/core/Database.js'
, 'controllersPath' : process.cwd() + '/api/controllers'
, 'port'            : (process.env.PORT || 8080)
}
