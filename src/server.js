const Hapi = require('hapi');
const routes = require('./routes');
const Jwt = require('hapi-auth-jwt2');
const secret = require('./secret');
const validate = require('./validate');

const server = new Hapi.Server();
let portNo;

if (process.env.NODE_ENV) { portNo = process.env.NODE_ENV.toString().toLowerCase() === 'development' ? 3000 : 9000; } else {
  portNo = process.env.PORT || 8080;
}

server.connection({
  port: portNo,
  host: 'localhost',
});


server.register([
  Jwt,
], (err) => {
  if (err) {
    throw err;
  }
});

server.auth.strategy('jwt', 'jwt', {
  key: secret.secret,
  validateFunc: validate,
  verifyOptions: {
    algorithms: ['HS256'],
  },
});

server.auth.default('jwt');


server.route(routes);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw (err);
    }
    console.log(`Server started at ${server.info.uri}`);
  });
}

module.exports = server;
