const Joi = require('joi');

const schema = {
  userName: Joi.string().min(5).max(15).regex(/^[a-z][a-zA-Z0-9_]*$/i),
  /*
    password rules :
    1.Start with alphabet
    2.Contains atleast one digit, one capital,one special character [Order should be same]
    3.Contain any word character
  */
  password: Joi.string().min(6).max(20).regex(/^[a-zA-Z][a-zA-Z0-9_]*[0-9][a-zA-Z0-9_]*[A-Z][a-zA-Z0-9]*[%$^&*#@][a-zA-Z0-9_]*$/),
};

const validation = (data, config) => {
  config = config || {};
  const err = Joi.validate(data, schema, config);
  if (err.error === null) {
    return 'valid';
  }
  return 'invalid';
};
module.exports = validation;
