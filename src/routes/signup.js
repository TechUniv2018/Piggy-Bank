const Model = require('../../models');
const generateHash = require('../helpers/generateHash');
const Boom = require('boom');

const ID = function () {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
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
      phoneNumber,
      userName,
      password,
    } = request.payload;

    Model.users.findOne({
      where: {
        phoneNumber,
      },
    }).then((user) => {
      console.log(user);
      if (user && user.phoneNumber === phoneNumber) {
        throw Boom.badRequest('Phone number taken');
      }
    }).then(() => {
      console.log('hELLO');
      generateHash(password, 10).then((hash) => {
        Model.users.create({
          phoneNumber,
          userName,
          password: hash,
          accountId: ID(),
        });
      });
    }).then(() => {
      reply({
        statusCode: 201,
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
