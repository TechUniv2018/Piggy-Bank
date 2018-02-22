const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');
const updateAccountDetails = require('./updateAccountDetails');
const editPassword = require('./editPassword');

module.exports = [].concat(
  loginRequest, updateAccountDetails,
  editPassword, moveToDashbboard,
);
