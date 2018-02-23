const Server = require('../../server');
const Models = require('../../../models');
const generateHash = require('../../helpers/generateHash');

describe('Testing the hapi server for GET request', () => {
  beforeEach((done) => {
    generateHash('Scooby!23', 10).then(hashedPassword => Models.user_authentication.bulkCreate([{
      userid: 'anmolvarma',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userid: 'anmvarma',
      password: hashedPassword,
      token: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]).then(() => {
      done();
    })).catch((err) => {
      console.log(err.message);
    });
  });

  afterEach((done) => {
    Models.user_authentication.destroy({
      where: { userid: 'anmolvarma' || 'anmvarma' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Valid status code for correct password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmolvarma',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      console.log(response.result);
      expect(response.result.statusCode).toBe(200);
      done();
    });
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
  test('Get access token for correct password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmolvarma',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      // console.log(response.headers);
      expect(typeof response.headers.token).toBe('string');
      done();
    });
  });
  test('Invalid username and password', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'dsfnnkds',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Invalid username');
      done();
    });
  });

  test('User trying to login after logging in', (done) => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        userName: 'anmvarma',
        userPassword: 'Scooby!23',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('User already logged in');
      done();
    });
  });
});
