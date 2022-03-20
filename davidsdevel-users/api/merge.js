const {manageMethods} = require('@lettercms/utils');
const POST = require('../lib/merge');
const Model = require('../lib/database');

module.exports = manageMethods(Model, {
  POST
});
