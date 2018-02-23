const Models = require('../../models');
// const Boom = require('boom');

const deleteUserToken = (username, accessToken) => Models.user_authentication.update({
  token: null,
}, {
  where: {
    userid: username,
    token: accessToken,
  },
});

module.exports = [
  {
    method: 'DELETE',
    path: '/auth',
    handler: (request, response) => {
      const username = request.headers.user;
      const accessToken = request.headers.token;
      // console.log(username, accessToken);
      return deleteUserToken(username, accessToken).then((userEntry) => {
        console.log(userEntry);
        if (userEntry[0] === 1) {
          return response({ message: 'User logged out', statusCode: 200 });
        }
        return response({ message: 'Invalid request', statusCode: 401 });
      }).catch((err) => {
        response({ message: err.message, statusCode: 500 }).header('token', null);
      });
    },
  },
];
