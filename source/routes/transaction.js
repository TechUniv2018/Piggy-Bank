const depositMoney = require('../helpers/depositMoney');
const withdrawMoney = require('../helpers/withdrawMoney');
const getCurrentBalance = require('../../source/helpers/getCurrentBalance');
const Joi = require('joi');
const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/money',
    config: {
      validate: {
        payload: {
          amount: Joi.number().min(100).max(20000).required(),
          accountNumber: Joi.string().required(),
        },
      },
    },
    handler: (request, response) => {
      const transactionAction = request.query.action;
      const { amount } = request.payload;
      const { accountNumber } = request.payload;
      switch (transactionAction) {
        case 'deposit': {
          getCurrentBalance(accountNumber).then((resp) => {
            let balance = null;
            if ('currentBalance' in resp[0]) {
              balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
              console.log(balance);
            }
            if (balance !== null && balance !== undefined && amount <= 2147483647 - balance) {
              Models.accounts.update({
                currentBalance: +balance + +amount,
              }, { where: { accountNumber } }).then(() => {
                response({ message: `${amount} is added to your account`, status_code: 200 });
              }).catch(error => ({
                data: `Error in depositing data => ${error.message}`,
                status_code: 500,
              }));
            } else {
              response({
                message: 'Sorry,deposit failed',
                status_code: 500,
              });
            }
          }).catch(() => {
            response({ message: 'Please enter valid account number', status_code: 400 });
          });
          break;
        }
        case 'withdrawal':
          withdrawMoney(accountNumber, amount);
          break;
        default:
          response({ message: 'Please enter valid action', status_code: 400 });
      }
    },
  },
];

