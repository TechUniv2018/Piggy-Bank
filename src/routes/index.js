const postReq = require('./postRequest');
const getReq = require('./getRequest');

module.exports = [].concat(getReq, postReq);
