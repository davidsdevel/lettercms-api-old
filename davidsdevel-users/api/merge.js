const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const POST = require('../lib/merge');
const Model = require('../lib/database');

module.exports = manageMethods(Model, {
  POST
});
