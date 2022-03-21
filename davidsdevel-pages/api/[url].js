const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const GET = require('../lib/subdomainUrl.get');
const PATCH = require('../lib/subdomainUrl.patch');
const DELETE = require('../lib/subdomainUrl.delete');

module.exports = manageMethods(Model, {
  GET,
  PATCH,
  DELETE
});
