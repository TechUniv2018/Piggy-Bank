const Joi = require('joi');
//
const schema = {
  username: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
  userPassword: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
};

const validation = (data, config) => {
  const configure = config || {};
  const err = Joi.validate(data, schema, configure);
  if (err.error === null) {
    return 'valid';
  }
  return 'invalid';
};
module.exports = validation;
