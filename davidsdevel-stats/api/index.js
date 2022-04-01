const {manageMethods} = require(process.cwd() + '/utils');
const POST = require('../lib/index.post');
const GET = require('../lib/index.get');

module.exports = manageMethods({
  GET,
  POST
});
