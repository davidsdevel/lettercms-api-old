const {manageMethods} = require('@lettercms/utils');
const Models = require('../lib/database');
const POST = require('../lib/index.post');
const GET = require('../../lib/index.get');

module.exports = manageMethods(Models, {
  GET,
  POST
});
