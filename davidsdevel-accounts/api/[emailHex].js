const {manageMethods} = require(process.cwd() + '/utils');
const GET = require('../lib/emailHex.get');
const PATCH = require('../lib/emailHex.patch');

module.exports = manageMethods({
  GET,
  PATCH
});
