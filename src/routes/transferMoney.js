
const Models = require('../../models');
const tranferPayloadValidation = require('./../validations/transfer');
const headerValidation = require('./../validations/header');
const sequelize = require('sequelize');

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
      sequelize.transaction().then(t => sequelize.Promise.all([
        Project.create({
          title: 'my awesome project',
          description: 'woot woot. this will make me a rich man',
        }, { transaction: t }),
        Task.build({
          title: 'specify the project idea',
          description: 'bla',
          deadline: new Date(),
        }, { transaction: t }),
      ]).then((project, task) => t.commit(), err => t.rollback()));
    },
  },
];
