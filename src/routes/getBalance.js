const Models = require('../../models');


const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'POST',
    path: '/user/balance',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'balance api current user',
      notes: 'balance api current user',
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
        attributes: ['currentBalance'],
      }).then((result) => {
        if (result === null) {
          const resultObject = { message: 'Account not created successfully' };

          return response(resultObject);
        }
        console.log(result.currentBalance);
        return response(result);
      }).catch((err) => {
        response(err.message);
      });
    },
  }];
