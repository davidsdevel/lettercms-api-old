const {manageMethods} = require('@lettercms/utils')
const Model = require('../lib/database');
const POST = require('../lib/import')

module.exports = manageMethods(Model, {
  POST
});
