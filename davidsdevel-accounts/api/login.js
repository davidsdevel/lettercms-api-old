const {manageMethods} = require(process.cwd() + '/utils');
const POST = require('../lib/login');

module.exports = manageMethods({
  POST
});
