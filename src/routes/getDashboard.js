const Models = require('../../models');
const strftime = require('strftime');
const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'GET',
    path: '/user/details',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'Get user details for current user',
      notes: 'Get user details for current user',
      validate: {
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const userName = request.auth.credentials.username;
      Models.bankusers.findAll({ where: { userName } })
        .then((result) => {
          if (result === null) {
            const resultObject = { statusCode: 401, message: 'No such user exists' };
            return response(resultObject);
          }
          const dob = strftime('%F', new Date(result[0].dob));
          const resultObject = {
            name: result[0].name,
            address: result[0].address,
            aadharNumber: result[0].aadharNumber,
            guardian: result[0].guardian,
            dob: `(YYYY/MM/DD) ${dob}`,
            gender: result[0].gender,
          };
          return response({ statusCode: 200, message: 'User details sent', detailsObject: resultObject });
        }).catch((err) => {
          response({ statusCode: 500, message: 'Server error', error: err.message });
        });
    },
  }];
