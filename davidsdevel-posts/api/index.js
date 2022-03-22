const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const GET = require('../lib/subdomain.get');
const POST = require('../lib/subdomain.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});
