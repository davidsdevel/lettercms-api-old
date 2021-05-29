const {manageMethods} = require('@lettercms/utils');
const Model = require('../../lib/database');
const GET = require('../..//lib/social.get');

module.exports = manageMethods(Model, {
  GET
});
