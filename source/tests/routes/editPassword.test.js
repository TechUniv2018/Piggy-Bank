const server = require('../../server');

describe('Testing edit Password', () => {
  test('Responds with message for invalid password', (done) => {
    const options = {
      method: 'POST',
      url: '/users/John_1234/password',
      payload: { userName: 'John_1234', password: 'WrongPassword' },
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Wrong Password');
      done();
    });
  });
  test('Responds with message for invalid new password format', (done) => {
    const options = {
      method: 'POST',
      url: '/users/John_1234/password',
      payload: {
        userName: 'John_1234', password: 'wearebest2D%', password1: 'wrong format', password2: 'wearebest2D%',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Incorrect password format');
      done();
    });
  });
});

