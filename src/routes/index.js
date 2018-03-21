const moveToDashbboard = require('./getDashboard');
const updateAccountDetails = require('./updateAccountDetails');
// const authenticate = require('./authRequest');
// const verify = require('./verifyRequest');
const logout = require('./deleteRequest');
const editPassword = require('./editPassword');
const transactionRequest = require('./transaction.js');
const transferMoney = require('./transferMoney.js');
const signUp = require('./signup');
const miniStatement = require('./miniStatement');
const login = require('./login');
const getOtp = require('./getTokenForAadhaar');
const otpVerify = require('./verifyOTPandToken');
const getBalance = require('./getBalance');
const checkUsernameExist = require('./checkUsernameExist');

module.exports = [].concat(
  updateAccountDetails,
  editPassword, moveToDashbboard, transactionRequest,
  logout, transferMoney, signUp,
  miniStatement, login, getOtp, otpVerify,
  getBalance, checkUsernameExist,
);
