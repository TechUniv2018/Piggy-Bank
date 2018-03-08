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
    } = request.payload;

    Model.bankusers.findOne({
      where: {
        userName,
      },
    }).then((user) => {
      console.log(user);
      if (user && user.userName === userName) {
        throw Boom.badRequest('userName taken');
      }
    }).then(() => {
      const id = `${userName}`;
      generateHash(password, 10).then((hash) => {
        Model.bankusers.create({
          userName,
          password: hash,
          userId: id,
        }).then(() => {
          Model.accounts.create({
            userId: id,
            currentBalance: 0,
            accountType: 'Savings',

          });
        });
      });
    }).then(() => {
      reply({
        statusCode: 200,
        error: '',
        message: 'User successfully created',
      });
    })
      .catch((err) => {
        reply(err);
      });
  },
},
];

module.exports = route;
