const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Models = require('../lib/database');
const POST = require('../lib/views.post');

module.exports = manageMethods(Models, {
  POST
});
