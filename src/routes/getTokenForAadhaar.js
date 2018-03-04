const Models = require('../../models');
const rp = require('request-promise');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/otpToken',
    config: {
      auth: false,
      handler: (request, reply) => {
        console.log('hello');
        Models.user_token.findOne({
          where: { aadhaar_id: request.payload.aadhaarNo, isVerified: true },
        }).then((aadhaarNoResponse) => {
          if (aadhaarNoResponse === null) {
            const options = {
              method: 'POST',
              uri: 'http://localhost:6060/otp',
              body: {
                aadhaarNo: request.payload.aadhaarNo,
              },
              json: true,
            };
            return rp(options)
              .then(parsedBody => Models.user_token.upsert({
                aadhaar_id: request.payload.aadhaarNo,
                token: parsedBody.verificationToken,
                isVerified: false,
              })).then(() => reply({ statusCode: 200, message: 'OTP sent to registered mobile number' }))
              .catch(err => reply({ statusCode: 500, message: err.message }));
          }
          return reply({ statusCode: 400, message: 'User already registered' });
        });
      },
      validate: {
        payload: Joi.object({
          aadhaarNo: Joi.string().regex(/^[1-9]{1}[0-9]{11}$/).required(),
        }),
      },
    },
  }];
