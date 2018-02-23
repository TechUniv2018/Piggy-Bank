const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/user/miniStatement',
    handler: (request, response) => {
      Models.transactions.findAll({
        where: {
          fromAccount: request.query.accountNumber,
          toAccount: request.query.accountNumber,
        },
        limit: 10,
      }).then((result) => {
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
