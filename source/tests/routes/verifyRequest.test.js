const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    Models.user_authentication.destroy({ where: { userid: 'anmolvarma' }, truncate: true }).then(() => {
      Models.user_authentication.create({
        userid: 'anmolvarma',
        password: 'Scooby!23',
        token: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).then(() => {
        done();
      });
    }).catch((err) => {
      console.log(err.message);
    });
  });

  afterEach((done) => {
    Models.user_authentication.destroy({
      where: { userid: 'anmolvarma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Verify a user', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '1234',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('User is verified');
      done();
    });
  });

  test('User is not verified', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '1221334',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('User is not verified. Redirect to login page');
      done();
    });
  });

  test('Verify a user', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '1234',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(200);
      done();
    });
  });

  test('User is not verified', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '1221334',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(401);
      done();
    });
  });
});
