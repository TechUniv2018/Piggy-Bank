const Models = require('../../models');
const Sequelize = require('sequelize');

module.exports = [
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: (request, response) => {
      Models.Users.findAll().then((result => result.map(row => ({
        userId: row.userId,
        password: row.password,
      }))))
        .then((users) => {
          response({
            data: users,
            statusCode: 200,
          });
        })
        .catch((error) => {
          response({
            data: `Error in fetching data => ${error}`,
            statusCode: 500,
          });
        });
    },
  }];
