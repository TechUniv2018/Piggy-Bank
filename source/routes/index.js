const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');
const updateAccountDetails = require('./updateAccountDetails');
const authenticate = require('./authRequest');
const verify = require('./verifyRequest');
const logout = require('./deleteRequest');
const editPassword = require('./editPassword');
const signUp = require('./signup');

module.exports = [].concat(
  loginRequest, verify, logout, updateAccountDetails,
  moveToDashbboard, authenticate, editPassword, signUp,
  loginRequest, updateAccountDetails,
  editPassword, moveToDashbboard,
);
