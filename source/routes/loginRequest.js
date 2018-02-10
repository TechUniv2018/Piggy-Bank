const Models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword.js');
const validation = require('../helpers/validation');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, response) => {
      const userName = request.payload.userName;
      const password = request.payload.password;
      if (validation({ userName, password }) === 'invalid') {
        response({ message: 'Authentication failed', statusCode: 400 });
      }
    },
  },
];
