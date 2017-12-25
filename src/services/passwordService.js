const bcrypt = require('bcrypt');

const verifyPassword = (data, hash, callback) => {
  bcrypt.compare(data, hash, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
module.exports.verifyPassword = verifyPassword;

const hashPasswordPromise = (password) => (
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err, `\nPassword is - ${password}`);
        reject(new ServiceError('Something wrong with password', err));
      }
      resolve(hash);
    });
  })
);
module.exports.hashPasswordPromise = hashPasswordPromise;