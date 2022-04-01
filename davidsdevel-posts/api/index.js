const {manageMethods} = require(process.cwd() + '/utils');
const GET = require('../lib/subdomain.get');
const POST = require('../lib/subdomain.post');

module.exports = manageMethods({
  GET,
  POST
});
