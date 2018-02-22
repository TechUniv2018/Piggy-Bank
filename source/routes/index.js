const postRequest = require('./postRequest');
const getRequest = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');
const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');
const updateAccountDetails = require('./updateAccountDetails');
const showLogin = require('./getLogin');
const editPassword = require('./editPassword');
const transactionRequest = require('./transaction.js');

module.exports = [].concat(
  getRequest, postRequest, getReqQuery,
  getReqValue, loginRequest, updateAccountDetails,
  showLogin, editPassword, moveToDashbboard, transactionRequest,
);
