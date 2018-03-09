
const Joi = require('joi');
// const phoneValidator = require('joi-phone-validator');

const registerPayloadValidation = Joi.object({
  // phoneNumber: phoneValidator.phone().mobile().required(),
  userName: Joi.string().regex(/^[-\w.$@*!]{1,15}$/).required(),
  password: Joi.string().min(6).max(20)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
  aadhaarNo: Joi.string().regex(/^[1-9]{1}[0-9]{11}$/).required(),
  isVerified: Joi.string().regex(/^(true|false)$/i).required(),
});

module.exports = registerPayloadValidation;
