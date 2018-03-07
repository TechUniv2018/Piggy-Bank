const Model = require('../../models');
const generateHash = require('../helpers/generateHash');
const Boom = require('boom');

const registerPayloadValidation = require('../validations/userRegister');

const route = [{
  method: 'POST',
  path: '/users',
  config: {
    tags: ['api'],
    description: 'register new user',
    notes: 'register new user',
    validate: {
      payload: registerPayloadValidation,
    },
    auth: false,
  },
  handler: (request, reply) => {
    const {
      userName,
      password,
      aadhaarNo,
      isVerified,
    } = request.payload;
    Model.user_token.findOne({ where: { token: '', aadhaar_id: aadhaarNo, isVerified: false } }).then((findVerifiedToken) => {
      if (findVerifiedToken) {
        return Model.bankusers.findOne({
          where: {
            userName,
          },
        }).then((user) => {
          console.log(user);
          if (user && user.userName === userName) {
            return reply({ statusCode: 400, message: 'Username is taken' });
          } else if (isVerified.toString() === 'false') {
            return reply({ statusCode: 422, message: 'Visit your nearest aadhaar centre and get your details verified' });
          }
          const id = `${userName}_${new Date()}`;
          return generateHash(password, 10).then(hash => Model.bankusers.create({
            userName,
            password: hash,
            userId: id,
          }).then(() => Model.accounts.create({
            userId: id,
            currentBalance: 0,
            accountType: 'Savings',
          }).then(() =>
            Model.user_token.update({ isVerified: true }, { where: { aadhaar_id: aadhaarNo } }))));
        }).then(() => reply({
          statusCode: 200,
          error: '',
          message: 'User successfully created',
        }));
      }
      return reply({ statusCode: 404, message: 'OTP has not been verified yet' });
    }).catch(err => reply({ statusCode: 500, message: err.message }));
  },
},
];

module.exports = route;
