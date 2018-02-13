const validation = require('../../helpers/validation');

describe('Testing validation helper function', () => {
  test('Validation failed for userName less than 5 characters', () => {
    const data = { username: 'abtrt', userPassword: 'heH1llo98765H#' };
    expect(validation(data)).toBe('valid');
  });
  test('Validation failed for userName more than 15 characters', () => {
    const data = { username: 'abgfmdjnhgjnfkmdsfghjhgf', userPassword: 'hello98765H#' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password less than 6 characters', () => {
    const data = { username: 'wearebesd', userPassword: 'hello' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password more than 20 characters', () => {
    const data = { username: 'abgfmdjn', userPassword: 'hello9876543212345678765432fgdfgfsd' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for userName starting with number', () => {
    const data = { username: '1abgfmdjn', userPassword: 'hello98765H#' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for userName containing any other special character than _', () => {
    const data = { username: 'abg&fmdjn', userPassword: 'hello98765H#' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation passed for userName containing _ character', () => {
    const data = { username: 'abgf_mdjn', userPassword: 'hello98765H#' };
    expect(validation(data)).toBe('valid');
  });
  test('Validation failed for password starting with number', () => {
    const data = { username: 'abg_fmdjn', userPassword: '1hello9876' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password not containg atleast one capital letter', () => {
    const data = { username: '1abg_fmsd', userPassword: 'hello9876&' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password not containg atleast one special character', () => {
    const data = { username: 'abg_fmsd', userPassword: 'HELLO9876s' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password not containg atleast one digit', () => {
    const data = { username: 'abg_fmsd', userPassword: 'HELLOkghfwefs' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation passed for correct username and password format', () => {
    const data = { username: 'abg_fmsd', userPassword: 'codechef12D$' };
    expect(validation(data)).toBe('valid');
  });
  test('Validation failed for password containing any special character other than %$^&*#@', () => {
    const data = { username: 'John_1234', userPassword: 'codechefD12$!' };
    console.log(validation(data));
    expect(validation(data)).toBe('invalid');
  });
});
