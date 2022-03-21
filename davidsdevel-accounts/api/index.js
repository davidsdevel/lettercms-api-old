const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const GET = require('../lib/index.get');
const POST = require('../lib/index.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});
