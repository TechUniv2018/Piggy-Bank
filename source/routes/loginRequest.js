const Models = require('../../models');
const verifyPassword = require('../helpers/verifyPassword.js');
const validation = require('../helpers/validation');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, response) => {
      const userName = request.payload.userName;
      const password = request.payload.password;
      console.log(validation({ userName, password }));
      if (validation({ userName, password }) === 'invalid') {
        response({ message: 'Authentication failed[Invalid format]', statusCode: 400 });
      } else {
        Models.bankusers.findOne({ where: { userName } }).then((userData) => {
          if (userData === null || userData === undefined) { response({ message: 'Authentication failed[UserName invalid]' }); }
          if ('dataValues' in userData && 'password' in userData.dataValues) {
            const passwordDigest = userData.dataValues.password;
            verifyPassword(password, passwordDigest).then((flag) => {
              if (flag === false) {
                response({ message: 'Authentication failed[Incorrect password]' });
              } else { response({ message: 'User Authenticated' }); }
            });
          }
        });
      }
    },
  },
];
