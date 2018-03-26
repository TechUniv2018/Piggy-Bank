
const generateHash = require('../helpers/generateHash');
const Models = require('../../models');


const resetPassword = (request, response) => {
  const { resetCode, newPassword } = request.payload;
  Models.bankusers.findOne({
    resetCode,
  }).then((userDetails) => {
    if (userDetails) {
      generateHash(newPassword, 10).then(hashedPassword => Models.bankusers.update({
        password: hashedPassword,
      }, {
        where: {
          resetCode,
        },
      })).then(() => {
        response({
          statusCode: 200,
          message: 'Password Reset Successful',
        });
      });
    } else {
      response({
        statusCode: 401,
        message: 'No Such User Exists',
      });
    }
  });
};

module.exports = [
  {
    method: 'POST',
    path: '/reset/password',
    config: {
      auth: false,
      tags: ['api'],
      description: 'password reset api',
      notes: 'password reset api',
    },
    handler: resetPassword,
  }];
