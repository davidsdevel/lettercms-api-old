const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/collaborators.get');
const POST = require('../lib/collaborators.post');

module.exports = manageMethods({
  GET,
  POST
});
