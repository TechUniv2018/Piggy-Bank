const Models = require('../../models');
const tranferPayloadValidation = require('./../validations/transfer');
const headerValidation = require('./../validations/header');
const getCurrentBalance = require('./../helpers/getCurrentBalance');
const enterTransaction = require('./../helpers/enterTransaction');
const verifyPassword = require('../helpers/verifyPassword');
const pusher = require('../../Pusher/pusher');

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
      const { password } = request.payload;
      const { touserId } = request.payload;
      if (userId === touserId) {
        response({ message: 'Cannot transfer to your own account', status_code: 404 });
      }
      Models.bankusers.findOne({
        where: {
          userId,
        },
      })
        .then((user) => {
          verifyPassword(password, user.password).then((isTrue) => {
            if (isTrue) {
              const userIdPromise = getCurrentBalance(userId);
              const touserIdPromise = getCurrentBalance(touserId);
              Promise.all([userIdPromise, touserIdPromise]).then(([userIdResponse, touserIdResponse]) => {
                let withdrawbalance = null;
                let depositbalance = null;
                withdrawbalance = JSON.parse(JSON.stringify(userIdResponse))[0].currentBalance;
                if (touserIdResponse.length !== 0) {
                  depositbalance = JSON.parse(JSON.stringify(touserIdResponse))[0].currentBalance;
                }
                if (depositbalance !== null && amount <= withdrawbalance && amount <= 2147483647 - depositbalance) {
                  Models.sequelize.transaction(t =>
                    Models.accounts.update({
                      currentBalance: +withdrawbalance - +amount,
                    }, { where: { userId } }, { transaction: t }).then(() =>
                      Models.accounts.update({
                        currentBalance: +depositbalance + +amount,
                      }, { where: { userId: touserId } }, { transaction: t }))).then(() => {
                    const toRemainingBalance = +depositbalance + +amount;
                    const fromRemainingBalance = +withdrawbalance - +amount;
                    enterTransaction(userId, touserId, fromRemainingBalance, toRemainingBalance, amount, 'complete', 'transfer');
                    Models.bankusers.findOne({
                      where: {
                        userId,
                      },
                      attributes: ['name'],
                    }).then((result) => {
                      pusher.trigger('transfer-channel', 'transfer-event', {
                        from: userId, to: touserId, amount, name: result.name,
                      });
                      response({ message: 'Transfer done', status_code: 201, balance: fromRemainingBalance });
                    });
                  }).catch((err) => {
                    enterTransaction(userId, touserId, 0, 0, amount, 'failed', 'transfer');
                    response({ message: err.message, status_code: 500 });
                  });
                } else {
                  enterTransaction(userId, touserId, 0, 0, amount, 'failed', 'transfer');
                  response({ message: 'Transfer failed', status_code: 401 });
                }
              });
            } else {
              response({ message: 'Provide correct password', status_code: 404 });
            }
          });
        }).catch(() => {
          response({ message: 'Wrong password', status_code: 401 });
        });
    },
  },
];
