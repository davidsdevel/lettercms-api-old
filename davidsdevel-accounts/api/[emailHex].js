const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const GET = require('../lib/emailHex.get');
const PATCH = require('../lib/emailHex.patch');

module.exports = manageMethods(Model, {
  GET,
  PATCH
});
