const postRequest = require('./postRequest');
const getRequest = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');
const loginRequest = require('./loginRequest');
const updateAccountDetails = require('./updateAccountDetails');
// require all the request files and export them in an array
module.exports = [].concat(
  getRequest, postRequest, getReqQuery,
  getReqValue, loginRequest, updateAccountDetails,
);
