const Models = require('../../models');

module.exports = [
  {
    method: 'PUT',
    path: '/users/update',
    handler: (request, response) => {
      console.log('', request.payload);
      const username = request.payload.userName;
      const value = request.payload.email;
      // const email = request.payload.email;
      // const fName = request.payload.fName;
      // const lName = request.payload.lName;
      // [{}, {}, {}];
      Models.bankusers.update({
        email: value,
      }, {
        where: {
          userName: username,
        },
      }).then(() => {
        // response('Details Changed').code(201);
        console.log('Inside');
        response({
          statusCode: 201,
          message: 'Details Changed',
        });
      }).catch(() => {
        response('Paridhi');
      });
    },
  }];
