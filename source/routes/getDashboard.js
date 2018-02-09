const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    handler: (request, response) => {
      Models.users.findOne({ where: { user_name: request.query.username } })
        .then((result) => {
          const resultObject = {
            firstName: result.user_firstname,
            lastName: result.user_lastname,
            address: result.user_address,
            phone: result.user_phone,
            email: result.user_email,
            dob: result.user_dob,
            gender: result.user_gender,
            pan: result.user_pan,
            img_src: result.user_pic,
          };
          response.view('dashboard', resultObject);
        }).catch((err) => {
          response(`${err.message}`);
        });
    },
  }];
