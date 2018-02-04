module.exports = [
  {
    method: 'GET',
    path: '/route',
    handler: (request, response) => {
      // implement your logic here
      response({
        statusCode: 200,
        message: 'This is a get request to /route',
      });
    },
  }];
