const bcrypt = require('bcrypt');

module.exports = (myPlaintextPassword, storedHashedPassword) =>
  bcrypt.compare(myPlaintextPassword, storedHashedPassword).then(res => res);
