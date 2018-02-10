const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.Users.create({
      userId: 'surabhi123',
      password: 'pokji324',
    }).then((result) => {
      done();
    });
  });
  afterEach(() => {
    Models.Users.destroy({
      where: {},
      truncate: true,
    });
  }),
  test('Should return 200 status code for sucessful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/users/surabhi123',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Should return correct response for successful GET request', (done) => {
    const options = {
      method: 'GET',
      url: '/users/surabhi123',
    };
    Server.inject(options, (response) => {
      expect(JSON.parse(response.payload).data[0].password).toMatch('pokji324');
      done();
    });
  });
});
