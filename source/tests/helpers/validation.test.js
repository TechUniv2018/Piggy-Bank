const validation = require('../../helpers/validation');

describe('Testing validation helper function', () => {
  test('Validation failed for userName less than 5 characters', () => {
    const data = { userName: 'ab', password: 'hello6543' };
    expect(validation(data)).toMatch('invalid');
  });
  test('Validation failed for userName more than 15 characters', () => {
    const data = { userName: 'abgfmdjnhgjnfkmdsfghjhgf', password: 'hellodg' };
    expect(validation(data)).toMatch('invalid');
  });
  test('Validation failed for password less than 6 characters', () => {
    const data = { userName: 'wearebesd', password: 'hello' };
    expect(validation(data)).toMatch('invalid');
  });
  test('Validation failed for password more than 20 characters', () => {
    const data = { userName: 'abgfmdjn', password: 'hello9876543212345678765432fgdfgfsd' };
    expect(validation(data)).toMatch('invalid');
  });
  test('Validation failed for userName starting with number', () => {
    const data = { userName: '1abgfmdjn', password: 'hello98765' };
    expect(validation(data)).toMatch('invalid');
  });
  test('Validation failed for userName starting with number', () => {
    const data = { userName: '1abg&fmdjn', password: 'hello98765' };
    expect(validation(data)).toMatch('invalid');
  });
});
