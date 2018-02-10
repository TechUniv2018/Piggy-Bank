const Joi = require('joi');

const schema = {
  userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
  /*
    password rules :
    1.Start with alphabet
    2.Contains atleast one small letter, one capital,one special character and one digit
    3.Can contain any word character
  */
  password: Joi.string().min(6).max(20).regex(/^[a-zA-Z](?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])\w$/i),
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
