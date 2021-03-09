const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const GET = require('../lib/subdomainUrl.get');
const PATCH = require('../lib/subdomainUrl.patch');
const DELETE = require('../lib/subdomainUrl.delete');

module.exports = manageMethods(Model, {
  GET,
  PATCH,
  DELETE
});