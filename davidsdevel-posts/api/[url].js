const {manageMethods} = require(process.cwd() + '/utils');
const GET = require('../lib/find');
const PATCH = require('../lib/url.patch');
const DELETE = require('../lib/url.delete');

module.exports = manageMethods({
  GET,
  DELETE,
  PATCH
});
