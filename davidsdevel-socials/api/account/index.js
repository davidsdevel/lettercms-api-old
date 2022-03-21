const Model = require('../../lib/database');
const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const GET = require('../../lib/account.get');
const POST = require('../../lib/account.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});