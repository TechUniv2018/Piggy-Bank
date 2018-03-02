const models = require('../../models');
const Sequelize = require('sequelize');

// const historySwagger = require('../swagger/routes/history');
// const historyHeaderValidation = require('../validations/routes/history');


const getHistory = id => models.transactions.findAll({
  where: {
    [Sequelize.Op.or]: [{ fromId: id }, { toId: id }],
  },
});

module.exports = {
  method: 'GET',
  path: '/transactions/history',
  config: {
    auth: 'jwt',
    tags: ['api'],
    description: 'Get Transaction history for  current user',
    notes: 'Get All transaction history for current user',
    validate: {
      headers: historyHeaderValidation,
    },
  },
  handler: (request, response) => {
    getHistory(request.auth.credentials.phoneNumber).then((history) => {
      response({
        statusCode: 200,
        history,
      });
    });
  },
};
