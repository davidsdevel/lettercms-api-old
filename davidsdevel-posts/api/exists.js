const {manageMethods, exists} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');

module.exports = manageMethods(Model, {
  GET: exists
});