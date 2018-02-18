const Models = require('../../models');

module.exports = [
  {
    method: 'PUT',
    path: '/users/update',
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
      // console.log(updateObject);
      // for (key in updateObject) {
      //   console.log(updateObject[key], key);
      //   if (updateObject[key] === null || updateObject[key] === '') {
      //     delete updateObject[key];
      //   }
      // }
      // console.log(updateObject);
      Models.bankusers.update(updateObject, {
        where: {
          userName: username,
        },
      }).then((result) => {
        // console.log(result);
        // response('Details Changed').code(201);
        response({
          statusCode: 201,
          updateFlag: result,
          message: 'Details Changed',
        });
      }).catch((error) => {
        response({
          data: `Error in fetching data => ${error}`,
          statusCode: 500,
        });
      });
    },
  }];
