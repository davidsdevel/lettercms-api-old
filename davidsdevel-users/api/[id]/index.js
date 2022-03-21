const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const GET = require('../../lib/user.get');
const PATCH = require('../../lib/user.patch');
const DELETE = require('../../lib/user.delete');
const Model = require('../../lib/database');

module.exports = manageMethods(Model, {
  GET,
  PATCH,
  DELETE
});