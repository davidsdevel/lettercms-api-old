const Model = require('../lib/database');
const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const GET = require('../lib/all')


module.exports = manageMethods(Model, {
  GET
});