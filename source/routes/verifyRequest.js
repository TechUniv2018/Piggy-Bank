const Models = require('../../models');
// const Boom = require('boom');

const fetchUserEntry = (username, accessToken) => Models.user_authentication.findOne({
  where: {
    userid: username,
    token: accessToken,
  },
}).catch((err) => { console.log(err.message, '##'); return null; });

module.exports = [
  {
    method: 'GET',
    path: '/auth',
    handler: (request, response) => {
      const username = request.headers.user;
      const accessToken = request.headers.token;
      return fetchUserEntry(username, accessToken).then((userEntry) => {
        // console.log(userEntry, accessToken);
        if (userEntry && accessToken) {
          return response({ message: 'User is verified', statusCode: 200 });
        }
        return response({ message: 'User is not verified. Redirect to login page', statusCode: 401 });
      }).catch(err => response({ message: err.message, statusCode: 500 }).header('token', null));
    },
  },
];
