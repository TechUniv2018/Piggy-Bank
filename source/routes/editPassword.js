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
          if (validation({ userName: request.payload.userName, password: request.payload.password1 }) === 'valid') {
            if (request.payload.password1 === request.payload.password2) {
              // update password
            } else {
              response({
                statusCode: 422,
                message: 'Passwords do not match',
              });
            }
          } else {
            response({
              statusCode: 422,
              message: 'Incorrect password format',
            });
          }
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

