const Models = require('../../models');
const Sequelize = require('sequelize');

module.exports = [
  {
    method: 'GET',
    path: '/{userId}/{password}',
    handler: (request, response) => {
      Models.users.findAll({
        where: {
          [Sequelize.Op.and]: [{ userId: request.params.userId }, { password: request.params.password }],
        },
      }).then((result) => {
        console.log(result);
        response({
          result,
          statusCode: 200,
        });
      });
    },
  }];
