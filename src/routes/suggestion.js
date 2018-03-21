const Models = require('../../models');
const Sequelize = require('sequelize');
const headerValidation = require('../validations/header');

const { Op } = Sequelize;


const queryResultDecomposer = queryResult => ({
  name: queryResult.name,
  userName: queryResult.userName,
});

const getSuggestionForUser = (request, response) => {
  const typedUserName = request.params.userName;
  Models.bankusers.findAll({
    where: {
      userName: {
        [Op.like]: `${typedUserName}%`,
      },
    },
    limit: 10,
  }).then((queryResult) => {
    if (queryResult.length === 0) {
      response({
        statusCode: 404,
        error: 'User Name(s) not found',
      });
    } else {
      const decomposedQueryResult = [];
      queryResult.forEach((userObject) => {
        decomposedQueryResult.push(queryResultDecomposer(userObject));
      });
      response({
        statusCode: 200,
        data: decomposedQueryResult,
      });
    }
  }).catch(() => {
    response({
      statusCode: 404,
      error: 'UserName unavailable',
    });
  });
};

module.exports = [
  {
    method: 'GET',
    path: '/search/{userName}',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'suggest userName',
      notes: 'suggest userName',
      validate: {
        headers: headerValidation,
      },
    },
    handler: getSuggestionForUser,
  },
];
