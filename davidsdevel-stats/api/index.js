const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Models = require('../lib/database');
const POST = require('../lib/index.post');
const GET = require('../lib/index.get');

module.exports = manageMethods(Models, {
  GET,
  POST
});
