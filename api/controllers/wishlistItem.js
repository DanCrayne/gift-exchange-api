var Promise = require('promise');
var config  = require(process.cwd() + '/config');
var Database = require(config.dbController);

module.exports = {

  retrieveAllWishlistItems : function(req, res) {
    return new Promise(function(resolve, reject) {
      db = new Database(config.dbFile);
      db.getAllRecordsFromTable('wishlist_items').done(function(results) {
        let wishlistItemList = '';
        for (let wishlistItem of results) {
          wishlistItemList += wishlistItem.name + ' ' + wishlistItem.description + '\n';
        }
        resolve(wishlistItemList);
      });
    });
  }

};
