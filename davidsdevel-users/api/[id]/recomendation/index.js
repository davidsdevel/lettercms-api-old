const {manageMethods} = require('@lettercms/utils');
const GET = require('../../../lib/recomendation.get');
const POST = require('../../../lib/recomendation.post');
const Model = require('../../../lib/database');

module.exports = manageMethods(Model, {
  GET,
  POST
});
