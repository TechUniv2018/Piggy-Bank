
const Joi = require('joi');
const Models = require('../../models');
const fetch = require('node-fetch');
const crypto = require('crypto');

module.exports = [
  {
    method: 'POST',
    path: '/transfer',
    config: {
      validate: {
        payload: {
          amount: Joi.number().min(100).max(20000).required(),
          fromAccountNumber: Joi.string().required(),
          toAccountNumber: Joi.string().required(),
        },
      },
    },
    handler: (request, response) => {
      const { amount } = request.payload;
      const { fromAccountNumber } = request.payload;
      const { toAccountNumber } = request.payload;
      fetch('http://localhost:8080/money?action=withdrawal', {
        method: 'POST',
        body: JSON.stringify({ accountNumber: fromAccountNumber, amount }),
      })
        .then(resultWithdrawal => resultWithdrawal.json())
        .then((responseObj) => {
          if (responseObj.status_code === 201) {
            fetch('http://localhost:8080/money?action=deposit', {
              method: 'POST',
              body: JSON.stringify({ accountNumber: toAccountNumber, amount }),
            }).then(result => result.json())
              .then((result) => {
                if (result.status_code === 201) {
                  const id = crypto.randomBytes(16).toString('hex');
                  Models.transactions.create({
                    transactionId: id,
                    transactionStatus: 'complete',
                    toAccount: toAccountNumber,
                    fromAccount: fromAccountNumber,
                    transactionType: 'transfer',
                    transactionTimestamp: new Date(),
                    amount,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  }).then(() => {
                    response({ message: `${amount} rupees transfered from ${fromAccountNumber} to ${toAccountNumber}`, status_code: 201 });
                  });
                } else {
                  response({ message: 'Transfer failed', status_code: 400 });
                }
              }).catch((error) => {
                response({ message: error.message, status_code: 400 });
              });
          } else response({ message: 'Transfer failed', status_code: 500 });
        }).catch((error) => {
          response({ message: error.message, status_code: 400 });
        });
    },
  },
];

