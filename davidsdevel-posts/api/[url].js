const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const GET = require('../lib/find');
const PATCH = require('../lib/url.patch');
const DELETE = require('../lib/url.delete');

module.exports = manageMethods(Model, {
  GET,
  DELETE,
  PATCH
});
