const Models = require('../../models');
const strftime = require('strftime');

module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    handler: (request, response) => {
      Models.bankusers.findOne({ where: { userName: request.query.username } })
        .then((result) => {
          if (result === null) {
            const resultObject = { message: 'No such user exists' };
            response(resultObject);
          } else {
            const dob = strftime('%F', new Date(result.dob));
            const resultObject = {
              firstName: result.firstName,
              lastName: result.lastName,
              // address: result.address,
              phone: result.phoneNumber,
              email: result.email,
              dob: `(YYYY/MM/DD) ${dob}`,
              gender: result.gender,
              pan: result.panCardNumber,
              img_src: result.pic,
            };
            response.view('dashboard', resultObject);
          }
        }).catch((err) => {
          response(`${err.message}`);
        });
    },
  }];
