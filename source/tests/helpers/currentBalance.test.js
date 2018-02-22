const getCurrentBalanace = require('../../helpers/getCurrentBalance');

describe('Testing getCurrentBalance helper function', () => {
  test('Validation failed for userName less than 5 characters', () => {
    const data = { username: 'abtrt', userPassword: 'heH1llo98765H#' };
    expect(validation(data)).toBe('valid');
  });
});
