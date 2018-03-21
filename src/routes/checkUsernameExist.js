const Models = require('../../models');


const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'POST',
    path: '/usernames',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'username checking api',
      notes: 'username checking api',
      validate: {
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const userName = request.payload.username;
      Models.bankusers.findOne({
        where: {
          userName,
        },
        attributes: ['userName'],
      }).then((result) => {
        if (result === null) {
          const resultObject = { message: 'The username does not exist', status_code: 400 };
          return response(resultObject);
        }
        return response({ result });
      }).catch((err) => {
        response(err.message);
      });
    },
  }];
