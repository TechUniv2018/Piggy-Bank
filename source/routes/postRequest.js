const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/users/new',
    handler: (request, response) => {
      console.log(request);
      Models.users.create({
        userId: request.payload.userId,
        password: request.payload.password,
      }).then(() => {
        response({
          statusCode: 201,
          message: 'User created',
        });
      });
    },
  }];
