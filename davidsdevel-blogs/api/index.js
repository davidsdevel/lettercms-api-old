const {manageMethods} = require('@lettercms/utils');
const POST = require('../lib/index.post');
const GET = require('../lib/subdomain.get');
const PATCH = require('../lib/subdomain.patch');


module.exports = manageMethods({
  GET,
  POST,
  PATCH
});