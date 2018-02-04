const postReq = require('./postRequest');
const getReq = require('./getRequest');
const getReqQuery = require('./getRequestFromQuery');
const getReqValue = require('./getRequestWithValue');

// require all the request files and export them in an array
module.exports = [].concat(getReq, postReq, getReqQuery, getReqValue);
