const {manageMethods} = require(process.cwd() + '/utils');
const POST = require('../lib/session.post');

module.exports = manageMethods({
  POST
});
