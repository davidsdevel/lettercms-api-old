const {manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');
const POST = require('../lib/login');

module.exports = manageMethods(Model, {
  POST
});
