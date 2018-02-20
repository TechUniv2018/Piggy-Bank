const getRequest = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');
const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');
const updateAccountDetails = require('./updateAccountDetails');
const showLogin = require('./getLogin');
const authenticate = require('./authRequest');
const verify = require('./verifyRequest');
const logout = require('./deleteRequest');
const editPassword = require('./editPassword');
const signUp = require('./signup');

module.exports = [].concat(
  getRequest, getReqQuery, loginRequest, verify, logout, updateAccountDetails,
  getReqValue, moveToDashbboard, showLogin, authenticate, editPassword, signUp,
);
