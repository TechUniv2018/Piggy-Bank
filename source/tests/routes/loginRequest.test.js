const Server = require('../../server');

describe('Testing the login functionality', () => {
  test('Authentication failed for incorrect username format', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'J', password: 'codechefD12$hjfgdgsd' },
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Authentication failed[Invalid format]');
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
      expect(response.result.message).toBe('Authentication failed[Invalid format]');
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
      expect(response.result.message).toBe('Authentication failed[UserName invalid]');
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
      expect(response.result.message).toBe('Authentication failed[Incorrect password]');
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
