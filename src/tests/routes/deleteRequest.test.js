const Server = require('../../server');
const Models = require('../../../models');
const generateHash = require('../../helpers/generateHash');

describe('Testing the hapi server for DELETE request', () => {
  beforeEach((done) => {
    generateHash('Scooby!23', 10).then(hashedPassword => Models.user_authentication.bulkCreate([{
      userid: 'anmolvarma',
      password: hashedPassword,
      token: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]).then(() => {
      done();
    })).catch((err) => {
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

  test('Logout a logged in user and check message', (done) => {
    const options = {
      method: 'DELETE',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '1234',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('User logged out');
      done();
    });
  });
  test('Logout a logged in user and check statusCode', (done) => {
    const options = {
      method: 'DELETE',
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
  test('Not a valid user', (done) => {
    const options = {
      method: 'DELETE',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '123456',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Invalid request');
      done();
    });
  });
  test('Not a valid user', (done) => {
    const options = {
      method: 'DELETE',
      url: '/auth',
      headers: {
        user: 'anmolvarma',
        token: '122131234',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(401);
      done();
    });
  });
});
