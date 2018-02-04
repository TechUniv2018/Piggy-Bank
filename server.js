const Hapi = require('hapi');
const routes = require('./routes/');

const server = new Hapi.Server();
let portNo;

// create a server that listens on port 8080 if no argument is passed from command line
if (process.env.NODE_ENV) { portNo = process.env.NODE_ENV.toString().toLowerCase() === 'development' ? 3000 : 9000; } else {
  portNo = process.env.PORT || 8080;
}

// connection setup done for the server
server.connection({
  port: portNo,
  host: 'localhost',
});

// add route
server.route(routes);

// to start the server only when server.js is executed
if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw (err);
    }
    console.log(`Server started at ${server.info.uri}`);
  });
}

module.exports = server;
