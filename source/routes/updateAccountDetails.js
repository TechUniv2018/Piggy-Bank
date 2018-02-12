const Models = require('../../models');

module.exports = [
  {
    method: 'PUT',
    path: '/users/update',
    handler: (request, response) => {
      const updateObject = request.payload;
      const username = request.payload.userName;
      delete updateObject.userName;
      Models.bankusers.update(updateObject, {
        where: {
          userName: username,
        },
      }).then((result) => {
        console.log(result);
        // response('Details Changed').code(201);
        response({
          statusCode: 201,
          message: 'Details Changed',
        });
      }).catch(() => {
        response('Paridhi');
      });
    },
  }];
