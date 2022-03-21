const Model = require('../lib/database');
const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const POST = require('../lib/index.post')
const GET = require('../lib/subdomain.get')
const PATCH = require('../lib/subdomain.patch')


module.exports = manageMethods(Model, {
  GET,
  POST,
  PATCH
});