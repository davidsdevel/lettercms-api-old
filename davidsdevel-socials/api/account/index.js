const {manageMethods} = require(process.cwd() + '/utils');
const GET = require('../../lib/account.get');
const POST = require('../../lib/account.post');

module.exports = manageMethods({
  GET,
  POST
});