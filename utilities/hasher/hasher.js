const bcrypt = require('bcrypt');

const hasher = stringToHash =>
  new Promise((resolve, reject) => {
    let saltRounds = 10;
    bcrypt.hash(stringToHash, saltRounds, (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });

const compareHashes = (plainTextString, hashedString) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plainTextString, hashedString, (err, res) => {
      err ? reject(err) : res ? resolve(true) : resolve(false);
    });
  });

module.exports = {
  hasher,
  compareHashes
};
