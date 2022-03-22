const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/subdomain.get');
const POST = require('../lib/subdomain.post');
const Model = require('../lib/database');

module.exports = manageMethods(Model, {
  GET,
  POST
});
