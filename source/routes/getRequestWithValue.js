module.exports = [
  {
    method: 'GET',
    path: '/routes/{name}',
    handler: (request, response) => {
      // implement your logic here
      response({
        statusCode: 200,
        message: `${request.params.name} is passed in parameters.`,
      });
    },
  }];
