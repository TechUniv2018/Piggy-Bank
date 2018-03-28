const Pusher = require('pusher');
const secret = require('../src/secret');

const pusher = new Pusher({
  appId: '496248',
  key: 'a96a1aff13cc3d3aa6e8',
  secret: secret.pusher,
  cluster: 'us2',
  encrypted: true,
});

module.exports = pusher;
