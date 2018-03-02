
const Model = require('../models');

const validate = (decoded, request, callback) => {
  console.log('I have decoded', decoded.username);
  Model.bankusers.findAll()
    .then((account) => {
      if (account.filter(user => (user.userName === decoded.username)).length) {
        // console.log('hello');
        return callback(null, true);
      }
      return callback(null, false);
    });
};

module.exports = validate;
