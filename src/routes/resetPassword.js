

const headerValidation = require('../validations/header');
const generateHash = require('../helpers/generateHash');
const Models = require('../../models');


const forgotPassword = (request, response) => {
  const userName = request.payload.username;
  const newPassword = request.payload.password;

  Models.bankuser.findOne({
    userName,
  }).then((userDetails) => {
    if (userDetails) {
      generateHash(newPassword, 10).then((hashedPassword) => {
        Models.bankuser.update({
          password: hashedPassword,
        }, {
          where: {
            userName,
          },
        });
      });
    } else {
      response('No Such User Exists');
    }
  });
};

module.exports = [
  {
    method: 'POST',
    path: '/resetPassword',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'password reset api',
      notes: 'password reset api',
      validate: {
        headers: headerValidation,
      },
    },
    handler: forgotPassword,
  }];

