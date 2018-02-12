const Server = require('../../server');

describe('Server test', () => {
  test('Responds with success for valid request', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'pari',
        email: 'p@gmail.com',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
  test('Responds with Not Found for invalid path', (done) => {
    const options = {
      method: 'PUT',
      url: '/12345',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(404);
      done();
    });
  });
  test('response message verified', (done) => {
    const options = {
      method: 'PUT',
      url: '/users/update',
      payload: {
        userName: 'pari',
        email: 'p@gmail.com',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Details Changed');
      done();
    });
  });
});
