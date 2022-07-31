const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/id.get');
const POST = require('../lib/id.post');
const DELETE = require('../lib/id.delete');

module.exports = manageMethods({
  GET,
  POST,
  DELETE
});
