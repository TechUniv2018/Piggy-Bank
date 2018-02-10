const Joi = require('joi');

const schema = {
  userName: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
  password: Joi.string().min(6).max(20),
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
