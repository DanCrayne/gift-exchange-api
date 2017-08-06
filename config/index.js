var path = require('path');

module.exports = {
  'dbPath'  : (path.resolve('./db/giftex.db')),
  'port'    : (process.env.PORT || 8080)
}
