const Model = require('../../lib/database');
const {manageMethods} = require('@lettercms/utils');
const GET = require('../../lib/account.get');
const POST = require('../../lib/account.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});