const {manageMethods} = require('@lettercms/utils');
const GET = require('../../lib/user.get');
const PATCH = require('../../lib/user.patch');
const DELETE = require('../../lib/user.delete');

module.exports = manageMethods({
  GET,
  PATCH,
  DELETE
});