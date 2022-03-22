const Model = require('../lib/database');
const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/all')


module.exports = manageMethods(Model, {
  GET
});