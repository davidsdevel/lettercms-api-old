const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const GET = require('../lib/index.get');
const POST = require('../lib/index.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});
