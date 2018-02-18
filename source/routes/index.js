// const postRequest = require('./postRequest');
const getRequest = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');
const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');
const showLogin = require('./getLogin');
const authenticate = require('./authRequest');
const verify = require('./verifyRequest');
const logout = require('./deleteRequest');

// require all the request files and export them in an array
module.exports = [].concat(
  getRequest, getReqQuery, loginRequest, verify, logout,
  getReqValue, moveToDashbboard, showLogin, authenticate,
);
