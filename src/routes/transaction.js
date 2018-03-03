const getCurrentBalance = require('../../src/helpers/getCurrentBalance');
const Models = require('../../models');
const headerValidation = require('../validations/header');
const transactionPayloadValidation = require('../validations/transactions.js');
const enterTransaction = require('./../helpers/enterTransaction');

module.exports = [
  {
    method: 'POST',
    path: '/money',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'transaction for current user',
      notes: 'transaction for current user',
      validate: {
        payload: transactionPayloadValidation,
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const transactionAction = request.query.action;
      const { amount } = request.payload;
      const userId = request.auth.credentials.userid;
      switch (transactionAction) {
        case 'deposit': {
          getCurrentBalance(userId).then((resp) => {
            let balance = null;
            if ('currentBalance' in resp[0]) {
              balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
            }
            if (balance !== null && balance !== undefined && amount <= 2147483647 - balance) {
              Models.accounts.update({
                currentBalance: +balance + +amount,
              }, { where: { userId } }).then(() => {
                enterTransaction(userId, amount, 'complete', 'credit')
                  .then(() => {
                    response({ message: `${amount} rupees is added to your account. New bbalance is ${amount + balance}`, status_code: 201 });
                  });
              }).catch(error => ({
                data: `Error in depositing data => ${error.message}`,
                status_code: 500,
              }));
            } else {
              enterTransaction(userId, amount, 'failed', 'credit').then(() => {
                response({ message: 'OOPS, deposit transaction failed', status_code: 500 });
              });
            }
          }).catch(() => {
            response({ message: 'Please enter valid account number', status_code: 401 });
          });
          break;
        }
        case 'withdrawal': {
          getCurrentBalance(userId).then((resp) => {
            console.log(userId);
            let balance = null;
            if ('currentBalance' in resp[0]) {
              balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
              console.log(balance);
            }
            if (balance !== null && balance !== undefined && amount <= balance) {
              Models.accounts.update({
                currentBalance: +balance - +amount,
              }, { where: { userId } }).then(() => {
                enterTransaction(userId, amount, 'complete', 'debit').then(() => {
                  response({ message: `${amount} withdrawed from your account. New balance is ${balance - amount}`, status_code: 201 });
                });
              }).catch(error => ({
                data: `Error in withdrawing data => ${error.message}`,
                status_code: 500,
              }));
            } else {
              enterTransaction(userId, amount, 'failed', 'debit').then(() => {
                response({ message: 'OOPS, withdraw transaction failed', status_code: 500 });
              });
            }
          }).catch(() => {
            response({ message: 'Please enter valid account number', status_code: 401 });
          });
          break;
        }
        default:
          response({ message: 'Please enter valid action', status_code: 401 });
      }
    },
  },
];
