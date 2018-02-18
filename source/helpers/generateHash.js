const bcrypt = require('bcrypt');

const generateHash = (myPlaintextPassword, saltRounds) =>
  bcrypt.hash(myPlaintextPassword, saltRounds).then(hash => hash);

module.exports = generateHash;
