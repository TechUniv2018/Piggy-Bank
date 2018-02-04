const postReq = require('./postRequest');
const getReq = require('./getRequest');

// require all the request files and export them in an array
module.exports = [].concat(getReq, postReq);
