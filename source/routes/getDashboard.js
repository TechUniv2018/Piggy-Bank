const Models = require('../../models');
const strftime = require('strftime');

module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    handler: (request, response) => {
      Models.users.findOne({ where: { user_name: request.query.username } })
        .then((result) => {
          let resultObject;
          if (result === null) {
            resultObject = { message: 'No such user exsists' };
          } else {
            const dob = strftime('%F', new Date(result.user_dob));
            resultObject = {
              firstName: result.user_firstname,
              lastName: result.user_lastname,
              address: result.user_address,
              phone: result.user_phone,
              email: result.user_email,
              // dob: `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getYear()}`,
              dob: `(YYYY/MM/DD) ${dob}`,
              gender: result.user_gender,
              pan: result.user_pan,
              img_src: result.user_pic,
            };
          }
          response.view('dashboard', resultObject);
        }).catch((err) => {
          response(`${err.message}`);
        });
    },
  }];
