module.exports = [
  {
    method: 'POST',
    path: '/route',
    handler: (request, response) => {
      // implement your logic here
      response({
        statusCode: 200,
        message: 'This is a post request to /route',
      });
    },
  }];
