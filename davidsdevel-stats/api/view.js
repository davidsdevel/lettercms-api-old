const {manageMethods} = require('@lettercms/utils');
const Models = require('../lib/database');
const POST = require('../lib/views.post');

module.exports = manageMethods(Models, {
  POST
});
