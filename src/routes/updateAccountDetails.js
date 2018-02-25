const Models = require('../../models');

module.exports = [
  {
    method: 'PUT',
    path: '/users',
    handler: (request, response) => {
      const updateObject = request.payload;
      const username = request.payload.userName;
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
          userName: username,
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
