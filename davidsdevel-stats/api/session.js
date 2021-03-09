const {manageMethods} = require('@lettercms/utils');
const Models = require('../lib/database');
const POST = require('../lib/session.post');

module.exports = manageMethods(Models, {
  POST
});
