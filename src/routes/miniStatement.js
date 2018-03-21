const Models = require('../../models');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'POST',
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
      const { transactionsCount } = request.payload;
      console.log(userid, transactionsCount);
      Models.transactions.findAll({
        where: {
          [Op.or]: [{ fromAccount: userid }, { toAccount: userid }],
          transactionStatus: 'complete',
        },
        order: [
          ['id', 'DESC'],
        ],
        attributes: ['toAccount', 'fromAccount', 'fromRemainingBalance', 'toRemainigBalance', 'amount', 'transactionTimestamp'],
        limit: transactionsCount,
      }).then((result) => {
        if (result === null) {
          const resultObject = { message: 'No transactions' };
          return response(resultObject);
        }
        console.log('1');

        const allEntries = result.map((eachEntry) => {
          const {
            toAccount,
            fromAccount,
            fromRemainingBalance,
            toRemainigBalance,
            amount,
            transactionTimestamp,
          } = eachEntry;

          let eachTransaction = {};

          if (fromAccount === userid) {
            eachTransaction = {
              account: toAccount,
              balance: fromRemainingBalance,
              amount,
              type: 'Debit',
              transactionTimestamp,
            };
          } else {
            eachTransaction = {
              account: fromAccount,
              balance: toRemainigBalance,
              amount,
              type: 'Credit',
              transactionTimestamp,
            };
          }
          return eachTransaction;
        });
        return response(allEntries);
      }).catch((err) => {
        response(err.message);
      });
    },
  }];
