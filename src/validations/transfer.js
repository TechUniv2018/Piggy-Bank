const Joi = require('joi');

const transferPayloadValidation = Joi.object({
  touserId: Joi.string().required(),
  amount: Joi.number().min(100).max(20000).required(),
});

module.exports = transferPayloadValidation;
