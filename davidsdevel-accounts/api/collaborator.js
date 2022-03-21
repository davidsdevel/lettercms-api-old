const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const GET = require('../lib/collaborators.get');
const POST = require('../lib/collaborators.post');

module.exports = manageMethods(Model, {
  GET,
  POST
});
