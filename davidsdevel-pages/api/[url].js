const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/subdomainUrl.get');
const PATCH = require('../lib/subdomainUrl.patch');
const DELETE = require('../lib/subdomainUrl.delete');

module.exports = manageMethods({
  GET,
  PATCH,
  DELETE
});
