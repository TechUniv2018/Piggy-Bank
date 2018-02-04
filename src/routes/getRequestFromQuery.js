module.exports = [
  {
    method: 'GET',
    path: '/rout',
    handler: (request, response) => {
      // implement your logic here
      response({
        statusCode: 200,
        message: `${request.query.name} is passed in the url.`,
      });
    },
  }];
