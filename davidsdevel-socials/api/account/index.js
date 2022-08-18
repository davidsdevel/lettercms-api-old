const {manageMethods} = require('@lettercms/utils');
const GET = require('../../lib/account.get');
const POST = require('../../lib/account.post');
const PATCH = require('../../lib/account.patch');

module.exports = manageMethods({
  GET,
  POST,
  PATCH
});