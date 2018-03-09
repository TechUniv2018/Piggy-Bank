const Joi = require('joi');

const transferPayloadValidation = Joi.object({
  touserId: Joi.string().required(),
  amount: Joi.number().min(100).max(20000).required(),
  password: Joi.string().min(6).max(20)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

module.exports = transferPayloadValidation;
