const {manageMethods} = require('@lettercms/utils');
const GET = require('../../lib/grapes.get');
const POST = require('../../lib/grapes.post');

module.exports = manageMethods({
  GET,
  POST
});
