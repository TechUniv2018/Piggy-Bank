const uuidv1 = require('uuid/v1');
const Models = require('../../models');
// const Boom = require('boom');
const Joi = require('joi');

const fetchUserEntry = (username, password) => Models.user_authenticates.findOne({
  where: {
    userid: username,
    password,
  },
});

const updatehUserEntry = (username, value) => Models.user_authenticates.update({
  token: value,
}, {
  where: {
    userid: username,
  },
});


const checkUser = (userEntry, username) => {
  const getUUID = uuidv1();
  if (userEntry) {
    if (userEntry.token === null) {
      return updatehUserEntry(username, getUUID).then((ifUpdated) => {
        // console.log(typeof getUUID);
        if (ifUpdated[0] === 1) {
          return { message: { message: 'User authenticated', statusCode: 200 }, token: getUUID };
        }
        // userMessage = Boom.serverUnavailable('Server error');
        // userMessage.token = null;
        return { message: { message: 'Server error', statusCode: 500 }, token: null };
      });
    }
    // userMessage = Boom.conflict('User already logged in');
    // userMessage.token = null;
    return Promise.resolve({ message: { message: 'User already logged in', statusCode: 204 }, token: null });
  }
  // userMessage = Boom.unauthorized('Invalid username or password');
  // userMessage.token = null;
  return Promise.resolve({ message: { message: 'Invalid username or password', statusCode: 401 }, token: null });
};


module.exports = [
  {
    method: 'POST',
    path: '/auth',
    config: {
      handler: (request, response) => {
        const username = request.payload.userName;
        const password = request.payload.userPassword;
        fetchUserEntry(username, password).then((userEntry) => {
          checkUser(userEntry, username).then((returnMessage) => {
            response(returnMessage.message).header('token', returnMessage.token);
          });
        }).catch((err) => {
          response({ message: err.message, statusCode: 500 }).header('token', null);
        });
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string().min(5).max(15).regex(/^[a-z][a-zA-Z0-9_]*$/i),
          userPassword: Joi.string().min(6).max(20).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
        }),
      },
    },
  },
];
