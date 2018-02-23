const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');
const updateAccountDetails = require('./updateAccountDetails');
const authenticate = require('./authRequest');
const verify = require('./verifyRequest');
const logout = require('./deleteRequest');
const editPassword = require('./editPassword');
const transactionRequest = require('./transaction.js');
const transferMoney = require('./transferMoney.js');
const signUp = require('./signup');

module.exports = [].concat(
  loginRequest, updateAccountDetails,
  editPassword, moveToDashbboard, transactionRequest,
  authenticate, verify, logout, transferMoney, signUp,
);
