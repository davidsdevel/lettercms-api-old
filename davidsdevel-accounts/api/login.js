const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const POST = require('../lib/login');

module.exports = manageMethods(Model, {
  POST
});
