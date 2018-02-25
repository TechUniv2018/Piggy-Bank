const verifypassword = require('../../helpers/verifyPassword');
const bcrypt = require('bcrypt');

describe('Testing verifyPassword helper function', () => {
  test('Test case passed for comparing password and its digest', () => {
    bcrypt.hash('Hello1%##', 10).then((hash) => {
      verifypassword('Hello1%##', hash).then((res) => {
        expect(res).toBe(true);
      });
    });
  });
  test('Test case failed for comparing password and some other string digest', () => {
    bcrypt.hash('Hello1', 10).then((hash) => {
      verifypassword('Hello1%##', hash).then((res) => {
        expect(res).toBe(false);
      });
    });
  });
});
