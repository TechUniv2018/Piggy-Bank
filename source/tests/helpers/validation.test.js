const validation = require('../../helpers/validation');

describe('Testing validation helper function', () => {
  test('Validation failed for userName less than 5 characters', () => {
    const data = { userName: 'abtrt', password: 'heH1llo98765H#' };
    expect(validation(data)).toBe('valid');
  });
  test('Validation failed for userName more than 15 characters', () => {
    const data = { userName: 'abgfmdjnhgjnfkmdsfghjhgf', password: 'hello98765H#' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password less than 6 characters', () => {
    const data = { userName: 'wearebesd', password: 'hello' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password more than 20 characters', () => {
    const data = { userName: 'abgfmdjn', password: 'hello9876543212345678765432fgdfgfsd' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for userName starting with number', () => {
    const data = { userName: '1abgfmdjn', password: 'hello98765H#' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for userName containing any other special character than _', () => {
    const data = { userName: 'abg&fmdjn', password: 'hello98765H#' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation passed for userName containing _ character', () => {
    const data = { userName: 'abgf_mdjn', password: 'hello98765H#' };
    expect(validation(data)).toBe('valid');
  });
  test('Validation failed for password starting with number', () => {
    const data = { userName: 'abg_fmdjn', password: '1hello9876' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password not containg atleast one capital letter', () => {
    const data = { userName: '1abg_fmsd', password: 'hello9876&' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password not containg atleast one special character', () => {
    const data = { userName: 'abg_fmsd', password: 'HELLO9876s' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation failed for password not containg atleast one digit', () => {
    const data = { userName: 'abg_fmsd', password: 'HELLOkghfwefs' };
    expect(validation(data)).toBe('invalid');
  });
  test('Validation passed for correct username and password format', () => {
    const data = { userName: 'abg_fmsd', password: 'codechef12D$' };
    expect(validation(data)).toBe('valid');
  });
  test('Validation failed for password containing any special character other than %$^&*#@', () => {
    const data = { userName: 'John_1234', password: 'codechefD12$!' };
    console.log(validation(data));
    expect(validation(data)).toBe('invalid');
  });
});
