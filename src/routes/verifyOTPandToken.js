const rp = require('request-promise');
const Joi = require('joi');
const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/otpVerify',
    config: {
      auth: false,
      handler: (request, reply) => Models.user_token.findOne({
        where: { aadhaar_id: request.payload.aadhaarNo },
      }).then((aadhaarNoResponse) => {
        if (aadhaarNoResponse === null) {
          return reply({ statusCode: 400, message: 'No OTP has been sent to your number' });
        } else if (aadhaarNoResponse.isVerified === true) {
          return reply({ statusCode: 400, message: 'You are already a member' });
        }
        const options = {
          method: 'POST',
          uri: 'http://localhost:6060/details',
          body: {
            aadhaarNo: request.payload.aadhaarNo,
            token: aadhaarNoResponse.token,
            otp: request.payload.otp,
          },
          json: true,
        };
        return rp(options)
          .then((parsedBody) => {
            console.log(parsedBody);
            if (parsedBody.user_id === null) {
              return reply({ statusCode: 400, message: 'Authentication failed' });
            }
            return reply({ statusCode: 200, response: parsedBody });
          }).catch(err => reply({ statusCode: 500, message: err.message }));
      }),
      validate: {
        payload: Joi.object({
          aadhaarNo: Joi.string().regex(/^[1-9]{1}[0-9]{11}$/).required(),
          otp: Joi.string().regex(/^[0-9]{4}$/).required(),
        }),
      },
    },
  }];
