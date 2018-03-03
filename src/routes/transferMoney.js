
const Models = require('../../models');
const tranferPayloadValidation = require('./../validations/transfer');
const headerValidation = require('./../validations/header');
const getCurrentBalance = require('./../helpers/getCurrentBalance');
const enterTransaction = require('./../helpers/enterTransaction');

module.exports = [
  {
    method: 'POST',
    path: '/transfer',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'transfer money',
      notes: 'transfer moeny',
      validate: {
        payload: tranferPayloadValidation,
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const { amount } = request.payload;
      const userId = request.auth.credentials.userid;
      const { touserId } = request.payload;
      console.log('Hello', touserId);
      Models.sequelize.transaction(() => {
        getCurrentBalance(userId).then((resp) => {
          let balance = 0;
          balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
          if (amount <= balance) {
            Models.accounts.update({
              currentBalance: +balance - +amount,
            }, { where: { userId } }).then(() => {
              getCurrentBalance(touserId).then((resp1) => {
                balance = 0;
                console.log(resp1);
                balance = JSON.parse(JSON.stringify(resp1))[0].currentBalance;
                if (amount <= 2147483647 - balance) {
                  Models.accounts.update({
                    currentBalance: +balance + +amount,
                  }, { where: { userId: touserId } }).then(() => {
                    enterTransaction(userId, touserId, amount, 'complete', 'transfer');
                  });
                }
              }).then(() => {
              });
            });
          }
        });
      })
        .then(() => {
          response({ statusCode: 201, message: 'transaction added' });
        }).catch(() => {
          enterTransaction(userId, touserId, amount, 'failed', 'transfer');
          response({ statusCode: 500, message: 'Database error' });
        });
    },
  },
];

