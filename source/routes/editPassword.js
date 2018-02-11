const models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword');
const validation = require('../helpers/validation');
const generateHash = require('../helpers/generateHash');

module.exports = [module.exports = {
  method: 'POST',
  path: '/users/{userName}/password',
  handler: (request, response) => {
    // Authenticaltion stuff
    models.bankusers.findOne({
      where: {
        // get username from session
        userName: request.payload.userName,
      },
    }).then((data) => {
      verifyPassword(request.payload.password, data.password).then((res) => {
        if (res) {
          // check if new password in correct format
          // check if password entered twice correctly
          // update password
        } else {
          response({
            statusCode: 422,
            message: 'Wrong Password',
          });
        }
      });
    });
  },

}];

