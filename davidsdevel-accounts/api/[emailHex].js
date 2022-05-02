const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/emailHex.get');
const PATCH = require('../lib/emailHex.patch');

module.exports = manageMethods({
  GET,
  PATCH
});
