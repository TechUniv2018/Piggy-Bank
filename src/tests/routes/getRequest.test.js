const Server = require('../../server');

describe('Server test', () => {
  const options = {
    method: 'GET',
    url: '/route',
  };

  beforeAll((done) => {
    Server.on('start', () => {
      done();
    });
  });

  afterAll((done) => {
    Server.on('stop', () => {
      done();
    });
    Server.stop();
  });

  test('responds with success statusCode', (done) => {
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('response checked', (done) => {
    const output = 'This is a get request to /route';
    Server.inject(options, (response) => {
      expect(response.result).toBe(output);
      done();
    });
  });
});
