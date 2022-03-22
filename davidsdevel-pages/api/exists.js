const {exists, manageMethods} = require('@lettercms/utils');
const Model = require('../lib/database');

module.exports = manageMethods(Model, {
  GET: exists
});
