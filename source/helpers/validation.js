const Joi = require('joi');
//
const schema = {
  username: Joi.string().min(5).max(15).regex(/^[a-z][a-z0-9_]*$/i),
  /*
    password rules :
    1.Start with alphabet
    2.Contains atleast one digit, one capital,one special character [Order should be same]
    3.Contain any word character
  */
  userPassword: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
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

// console.log(validation({ username:"J", userPassword:"wearebest2D%" }))
