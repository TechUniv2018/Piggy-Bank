const validation = require('../../helpers/validation');

describe('Testing validation helper function', () => {
  test('Validation failed for userName less than 5 characters', () => {
    const data = { userName: 'ab', password: 'hello' };
    expect(validation(data)).toMatch('invalid');
  });
  test('Validation failed for userName more than 15 characters', () => {
    const data = { userName: 'abgfmdjnhgjnfkmdsfghjhgf', password: 'hello' };
    expect(validation(data)).toMatch('invalid');
  });
});
