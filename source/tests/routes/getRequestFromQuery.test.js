const Server = require('../../server');

describe('Server test', () => {
  test('responds with success for valid request', (done) => {
    const options = {
      method: 'GET',
      url: '/rout?name=anmol',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('responds for invalid path', (done) => {
    const options = {
      method: 'GET',
      url: '/12345',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(404);
      done();
    });
  });

  test('response message verified', (done) => {
    const options = {
      method: 'GET',
      url: '/rout?name=anmol',
    };
    const output = 'anmol is passed in the url.';
    Server.inject(options, (response) => {
      expect(response.result.message).toBe(output);
      done();
    });
  });
});
