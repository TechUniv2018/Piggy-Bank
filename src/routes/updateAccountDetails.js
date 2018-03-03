const Models = require('../../models');
const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'PUT',
    path: '/users',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'update account details for current user',
      notes: 'update account details for current user',
      validate: {
        headers: headerValidation,
      },
    },
    handler: (request, response) => {
      const updateObject = request.payload;
      const userName = request.auth.credentials.username;
      console.log(userName);
      delete updateObject.userName;
      console.log(request.payload);
      const propNames = Object.getOwnPropertyNames(updateObject);
      for (let i = 0; i < propNames.length; i += 1) {
        const propName = propNames[i];
        if (updateObject[propName] === null || updateObject[propName] === undefined || updateObject[propName] === '') {
          delete updateObject[propName];
        }
      }
      Models.bankusers.update(updateObject, {
        where: {
          userName,
        },
      }).then((result) => {
        response({
          statusCode: 201,
          updateFlag: result,
          message: 'Details Changed',
        });
      }).catch((error) => {
        response({
          data: `Error in fetching data => ${error.message}`,
          statusCode: 500,
        });
      });
    },
  }];
