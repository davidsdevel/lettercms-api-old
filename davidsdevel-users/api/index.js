const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const GET = require('../lib/subdomain.get');
const POST = require('../lib/subdomain.post');
const Model = require('../lib/database');

module.exports = manageMethods(Model, {
  GET,
  POST
});
