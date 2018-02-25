
const Joi = require('joi');
const phoneValidator = require('joi-phone-validator');

const registerPayloadValidation = Joi.object({
  phoneNumber: phoneValidator.phone().mobile().required(),
  userName: Joi.string().regex(/^[a-zA-Z][a-zA-Z]*$/).required(),
  password: Joi.string().min(6).max(20)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

module.exports = registerPayloadValidation;
