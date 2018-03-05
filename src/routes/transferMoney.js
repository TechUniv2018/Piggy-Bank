
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
      notes: 'transfer money',
      validate: {
        payload: tranferPayloadValidation,
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const { amount } = request.payload;
      const userId = request.auth.credentials.userid;
      const { touserId } = request.payload;
      const userIdPromise = getCurrentBalance(userId);
      const touserIdPromise = getCurrentBalance(touserId);
      Promise.all([userIdPromise, touserIdPromise]).then(([userIdResponse, touserIdResponse]) => {
        const withdrawbalance = JSON.parse(JSON.stringify(userIdResponse))[0].currentBalance;
        const depositbalance = JSON.parse(JSON.stringify(touserIdResponse))[0].currentBalance;
        if (amount <= withdrawbalance && amount <= 2147483647 - depositbalance) {
          Models.sequelize.transaction(t =>
            Models.accounts.update({
              currentBalance: +withdrawbalance - +amount,
            }, { where: { userId } }, { transaction: t }).then(() =>
              Models.accounts.update({
                currentBalance: +depositbalance + +amount,
              }, { where: { userId: touserId } }, { transaction: t }))).then(() => {
            response({ message: 'Transfer done', status_code: 201 });
            enterTransaction(userId, touserId, amount, 'complete', 'transfer');
          }).catch((err) => {
            enterTransaction(userId, touserId, amount, 'failed', 'transfer');
            response({ message: err.message, status_code: 500 });
          });
        } else {
          enterTransaction(userId, touserId, amount, 'failed', 'transfer');
          response({ message: 'Transfer failed', status_code: 401 });
        }
      });
    },
  },
];

