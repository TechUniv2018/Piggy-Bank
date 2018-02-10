const generateHash = require('../../helpers/generateHash');
const verifypassword = require('../../helpers/verifyPassword');
const bcrypt = require('bcrypt');

describe('Testing validation helper function', () => {
  test('Validation failed for userName less than 5 characters', () => {
    bcrypt.hash('Hello1%##', 10).then((hash) => {
      verifypassword('Hello1%##', hash).then((res) => {
        expect(res).toBe(true);
      });
    });
  });
});
