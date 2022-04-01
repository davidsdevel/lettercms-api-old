const {manageMethods} = require(process.cwd() + '/utils');
const POST = require('../lib/views.post');

module.exports = manageMethods({
  POST
});
