const {manageMethods} = require('@lettercms/utils');
const Model = require('../../lib/database');
const GET = require('../../lib/grapes.get');
const POST = require('../../lib/grapes.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});
