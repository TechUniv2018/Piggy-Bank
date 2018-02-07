const postReq = require('./postRequest');
const getReq = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');
const moveToDashbboard = require('./getDashboard');

// require all the request files and export them in an array
module.exports = [].concat(getReq, postReq, getReqQuery, getReqValue, moveToDashbboard);
