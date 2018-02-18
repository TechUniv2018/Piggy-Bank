const Server = require('../../server');
const Models = require('../../../models');

describe('Testing the login functionality', () => {
  beforeEach((done) => {
    Models.user_authenticates.create({
      userid: 'John_1234',
      password: 'wearebest2D%',
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
      where: { userid: 'John_1234' },
      truncate: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Authentication failed for incorrect username format', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'J', password: 'codechefD12$hjfgdgsd' },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Authentication failed [Invalid format]');
      done();
    });
  });
  test('Authentication failed for incorrect password format', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'Jdfgfsfas', password: 'codechefD1' },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Authentication failed [Invalid format]');
      done();
    });
  });
  test('Authentication failed username not present in database', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'Surabhi123', password: 'wearebest2D%' },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Authentication failed [UserName invalid]');
      done();
    });
  });
  test('Authentication failed incorrect password', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'John_1234', password: 'wearebest2F%' },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Authentication failed [Incorrect password]');
      done();
    });
  });
  test('Authentication done for correct login credentials', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'John_1234', password: 'wearebest2D%' },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('User Authenticated');
      done();
    });
  });
});
