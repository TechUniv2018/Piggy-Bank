const postRequest = require('./postRequest');
const getRequest = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');
const moveToDashbboard = require('./getDashboard');
const loginRequest = require('./loginRequest');

// require all the request files and export them in an array
module.exports = [].concat(getRequest, postRequest, loginRequest, getReqQuery, getReqValue, moveToDashbboard);
