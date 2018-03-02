const models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword');
const validation = require('../helpers/validation');
const generateHash = require('../helpers/generateHash');
const editPasswordPayloadValidation = require('../validations/editPassword');
const headerValidation = require('../validations/header');
const secret = require('../secret');
const Jwt = require('jsonwebtoken');
const Boom = require('boom');

module.exports = [module.exports = {
  method: 'POST',
  path: '/users/password',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'Get Transaction history for  current user',
    notes: 'Get All transaction history for current user',
    validate: {
      payload: editPasswordPayloadValidation,
      headers: headerValidation,
    },
  },
  handler: (request, response) => {
    if (request.headers && request.headers.authorization) {
      const authorization = request.headers.authorization;
      let decoded = request.headers.decoded;
      try {
        decoded = Jwt.verify(authorization, secret.secret);
      } catch (e) {
        return response.status(401).send('unauthorized');
      }
      const userName = request.auth.credentials.username;
      const password = request.payload.password;
      const newPassword = request.payload.newpassword;
      const retypePassword = request.payload.retypepassword;
      console.log(userName);
      models.bankusers.findOne({
        where: {
          userName,
        },
      }).then((data) => {
        verifyPassword(password, data.password).then((res) => {
          if (res) {
            if (validation({ username: userName, userPassword: newPassword }) === 'valid') {
              if (newPassword === retypePassword) {
                generateHash(newPassword, 10).then((hash) => {
                  models.bankusers.update(
                    {
                      password: hash,
                    },
                    {
                      where: {
                        userName,
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
                response(Boom.badRequest('Passwords do not match'));
              }
            } else {
              response(Boom.badRequest('Incorrect password format'));
            }
          } else {
            response(Boom.badRequest('Wrong password'));
          }
        });
      });
    }
  },
}];
