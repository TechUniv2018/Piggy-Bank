const models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword');
const validation = require('../helpers/validation');
const generateHash = require('../helpers/generateHash');
const editPasswordPayloadValidation = require('../validations/editPassword');
const headerValidation = require('../validations/header');
const Boom = require('boom');

module.exports = [module.exports = {
  method: 'POST',
  path: '/users/password',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'edit password for current user',
    notes: 'edit password for current user',
    validate: {
      payload: editPasswordPayloadValidation,
      headers: headerValidation,
    },
  },
  handler: (request, response) => {
    const userName = request.auth.credentials.username;
    const password = request.payload.currentpassword;
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
  ,
}];
