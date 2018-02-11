const Models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword.js');
const validation = require('../helpers/validation');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, response) => {
      const username = request.payload.userName;
      const userPassword = request.payload.password;
      console.log(validation({ username, userPassword }));
      if (validation({ username, userPassword }) === 'invalid') {
        response({ message: 'Authentication failed [Invalid format].', statusCode: 400 });
      } else {
        Models.bankusers.findOne({ where: { username } }).then((userData) => {
          if (userData === null || userData === undefined) { response({ message: 'Authentication failed [UserName invalid]' }); }
          if ('dataValues' in userData && 'password' in userData.dataValues) {
            const passwordDigest = userData.dataValues.password;
            verifyPassword(userPassword, passwordDigest).then((flag) => {
              if (flag === false) {
                response({ message: 'Authentication failed[Incorrect password]' });
              } else { response.redirect(`http://localhost:8080/dashboard?username=${username}`); }
            });
          }
        });
      }
    },
  },
];
