const Joi = require('joi');

const trasactionPayloadValidation = Joi.object({
  amount: Joi.number().min(100).max(20000).required(),
});

module.exports = trasactionPayloadValidation;
