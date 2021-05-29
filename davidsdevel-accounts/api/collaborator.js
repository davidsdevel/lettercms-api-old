const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const GET = require('../lib/collaborators.get');
const POST = require('../lib/collaborators.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});
