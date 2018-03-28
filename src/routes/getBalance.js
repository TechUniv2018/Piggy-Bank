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
      const result = {};
      Models.accounts.findOne({
        where: {
          userId: userid,
        },
        attributes: ['currentBalance'],
      }).then((balanceResult) => {
        if (balanceResult === null) {
          const resultObject = { message: 'Account not created successfully' };
          return response(resultObject);
        }
        result.currentBalance = balanceResult.currentBalance;
        return Models.bankusers.findOne({
          where: {
            userId: userid,
          },
          attributes: ['userId', 'name', 'userName'],
        }).then((kycDetails) => {
          if (kycDetails === null) {
            const resultObject = { message: 'Account not created successfully' };
            return response(resultObject);
          }
          result.userId = kycDetails.userId;
          result.name = kycDetails.name;
          result.userName = kycDetails.userName;
          return response(result);
        }).catch((err) => {
          response(err.message);
        });
      }).catch((err) => {
        response(err.message);
      });
    },
  },
];
