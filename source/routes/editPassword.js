const models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword');
const validation = require('../helpers/validation');
const generateHash = require('../helpers/generateHash');

module.exports = [module.exports = {
  method: 'POST',
  path: '/users/password',
  handler: (request, response) => {
    models.bankusers.findOne({
      where: {
        userName: request.payload.userName,
      },
    }).then((data) => {
      verifyPassword(request.payload.password, data.password).then((res) => {
        if (res) {
          if (validation({ username: request.payload.userName, userPassword: request.payload.password1 }) === 'valid') {
            if (request.payload.password1 === request.payload.password2) {
              generateHash(request.payload.password1, 10).then((hash) => {
                models.bankusers.update(
                  {
                    password: hash,
                  },
                  {
                    where: {
                      userName: request.payload.userName,
                    },
                  },
                ).then(() => {
                  response({
                    statusCode: 201,
                    message: 'Password updated successfully',
                  });
                });
              });
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
