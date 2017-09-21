var Promise = require('promise');
var config  = require(process.cwd() + '/config');

module.exports = {
  generateWithoutExclusions : function(participants) {
    let shuffle = require('knuth-shuffle').knuthShuffle;
    let userArray = [];

    let pairs = [];

    for (user of participants) {
      userArray.push(user.id);
    }
    userArray = shuffle(userArray);

    // create the list of pairs:
    // each element is paired with the next element, however the
    // last element is paired with the first
    for (let i = 0; i < userArray.length - 1; i++) {
      pair = [ userArray[i], userArray[i + 1] ];
      pairs.push(pair);
    }
    // add final pair to list of pairs
    pairs.push([ userArray[userArray.length - 1], userArray[0] ]);

    return pairs;
  }

, generateWithExclusions : function(participants, exlusions) {
  }
};
