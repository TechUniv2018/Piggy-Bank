const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.user_authenticates.create({
      userid: 'anmolvarma',
      password: 'Scooby!23',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      Models.user_authenticates.create({
        userid: 'anmvarma',
        password: 'Scooby!23',
        token: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }).then(() => {
      done();
    }).catch();
  });

  afterEach((done) => {
    Models.user_authenticates.destroy({
      where: { userid: 'anmolvarma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Since the password is not valid we will get a bad request', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmolvarma',
        userPassword: 'asdasfafa',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
