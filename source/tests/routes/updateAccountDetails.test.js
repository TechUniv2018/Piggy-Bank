const Server = require('../../server');

describe('Server test', () => {
  test('responds with success for valid request', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'pari',
        email: 'p@gmail.com',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  });
});
