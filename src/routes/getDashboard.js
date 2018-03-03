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
          const dob = strftime('%F', new Date(result.dob));
          const resultObject = {
            firstName: result.firstName,
            lastName: result.lastName,
            address: result.address,
            phone: result.phoneNumber,
            email: result.email,
            dob: `(YYYY/MM/DD) ${dob}`,
            gender: result.gender,
            pan: result.panCardNumber,
            img_src: result.pic,
          };
          return response({ statusCode: 200, message: 'User details sent', detailsObject: resultObject });
        }).catch((err) => {
          response({ statusCode: 500, message: 'Server error', error: err.message });
        });
    },
  }];
