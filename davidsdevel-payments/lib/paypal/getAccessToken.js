const getOauth = require('./getOauth');

module.exports = () => new Promise(resolve => getOauth().then(res => resolve(res.access_token)));
