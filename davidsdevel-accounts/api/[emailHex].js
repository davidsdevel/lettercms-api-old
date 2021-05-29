const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const GET = require('../lib/emailHex.get');
const PATCH = require('../lib/emailHex.patch');

module.exports = manageMethods(Model, {
  GET,
  PATCH
});
