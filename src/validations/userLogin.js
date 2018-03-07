const Joi = require('joi');

const registerPayloadValidation = Joi.object({
  userName: Joi.string().regex(/^[-\w.$@*!]{1,15}$/).required(),
  password: Joi.string().min(6).max(20)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

module.exports = registerPayloadValidation;
