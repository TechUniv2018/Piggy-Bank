const Models = require('../../models');

const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'POST',
    path: '/user/balance',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'transaction for current user balance',
      notes: 'transaction for current user balance',
      validate: {
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const { userid } = request.auth.credentials;
      console.log(userid);
      Models.accounts.findOne({
        where: {
          userId: userid,
        },
      }).then((result) => {
        if (result === null) {
          const resultObject = { statusCode: 400, message: 'Invalid request', balance: null };
          return response(resultObject);
        }
        return response({ statusCode: 200, balance: result.currentBalance });
      }).catch((err) => {
        response({ statusCode: 500, message: err.message });
      });
    },
  }];
