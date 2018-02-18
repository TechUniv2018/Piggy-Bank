module.exports = [
  {
    method: 'GET',
    path: '/rout',
    handler: (request, response) => {
      response({
        statusCode: 200,
        message: `${request.query.name} is passed in the url.`,
      });
    },
  }];
