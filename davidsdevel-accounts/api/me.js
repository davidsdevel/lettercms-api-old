const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const GET = require('../lib/me');

module.exports = manageMethods(Model, {
  GET
});
