const getCurrentBalance = require('../../source/helpers/getCurrentBalance');
const Joi = require('joi');
const Models = require('../../models');
const crypto = require('crypto');

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
            }
            if (balance !== null && balance !== undefined && amount <= 2147483647 - balance) {
              Models.accounts.update({
                currentBalance: +balance + +amount,
              }, { where: { accountNumber } }).then(() => {
                const id = crypto.randomBytes(16).toString('hex');
                Models.transactions.create({
                  transactionId: id,
                  transactionStatus: 'complete',
                  toAccount: accountNumber,
                  fromAccount: accountNumber,
                  transactionType: 'credit',
                  transactionTimestamp: new Date(),
                  amount,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }).then(() => {
                  response({ message: `${amount} rupees is added to your account`, status_code: 201 });
                });
              }).catch(error => ({
                data: `Error in depositing data => ${error.message}`,
                status_code: 500,
              }));
            } else {
              const id = crypto.randomBytes(16).toString('hex');
              Models.transactions.create({
                transactionId: id,
                transactionStatus: 'failed',
                toAccount: accountNumber,
                fromAccount: accountNumber,
                transactionType: 'credit',
                transactionTimestamp: new Date(),
                amount,
                createdAt: new Date(),
                updatedAt: new Date(),
              }).then(() => {
                response({ message: 'OOPS, deposit transaction failed', status_code: 500 });
              });
            }
          }).catch(() => {
            response({ message: 'Please enter valid account number', status_code: 401 });
          });
          break;
        }
        case 'withdrawal': {
          getCurrentBalance(accountNumber).then((resp) => {
            console.log(accountNumber);
            let balance = null;
            if ('currentBalance' in resp[0]) {
              balance = JSON.parse(JSON.stringify(resp))[0].currentBalance;
              console.log(balance);
            }
            if (balance !== null && balance !== undefined && amount <= balance) {
              Models.accounts.update({
                currentBalance: +balance - +amount,
              }, { where: { accountNumber } }).then(() => {
                const id = crypto.randomBytes(16).toString('hex');
                Models.transactions.create({
                  transactionId: id,
                  transactionStatus: 'complete',
                  toAccount: accountNumber,
                  fromAccount: accountNumber,
                  transactionType: 'debit',
                  transactionTimestamp: new Date(),
                  amount,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }).then(() => {
                  response({ message: `${amount} withdrawed from your account`, status_code: 201 });
                });
              }).catch(error => ({
                data: `Error in withdrawing data => ${error.message}`,
                status_code: 500,
              }));
            } else {
              const id = crypto.randomBytes(16).toString('hex');
              Models.transactions.create({
                transactionId: id,
                transactionStatus: 'failed',
                toAccount: accountNumber,
                fromAccount: accountNumber,
                transactionType: 'debit',
                transactionTimestamp: new Date(),
                amount,
                createdAt: new Date(),
                updatedAt: new Date(),
              }).then(() => {
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

