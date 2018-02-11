
module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (request, response) => {
      response.view('login', null);
    },
  },
];
