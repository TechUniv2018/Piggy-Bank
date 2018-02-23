const Models = require('../../models');
const strftime = require('strftime');

module.exports = [
  {
    method: 'GET',
    path: '/user/details',
    handler: (request, response) => {
      Models.bankusers.findOne({ where: { userName: request.headers.username } })
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
