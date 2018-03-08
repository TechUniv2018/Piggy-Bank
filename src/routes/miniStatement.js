const Models = require('../../models');

const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'GET',
    path: '/user/miniStatement',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'transaction for current user',
      notes: 'transaction for current user',
      validate: {
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const { userid } = request.auth.credentials;
      console.log(userid);
      Models.transactions.findAll({
        where: {
          fromAccount: userid,
          transactionStatus: 'complete',
          transactionType: 'transfer',
        },
        attributes: ['toAccount', 'fromRemainingBalance', 'amount', 'transactionTimestamp'],
        limit: 10,
      }).then((result) => {
      //  console.log(result);
        if (result === null) {
          const resultObject = { message: 'No transactions' };
          return response(resultObject);
        }
        return response(result);
      }).catch((err) => {
        response(err.message);
      });
    },
  }];
