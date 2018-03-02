
const Joi = require('joi');

const headerValidation = Joi.object({
  Authorization: Joi.string(),
}).unknown();

module.exports = headerValidation;
