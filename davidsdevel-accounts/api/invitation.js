const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../lib/database');
const POST = require('../lib/invitations.post');
const DELETE = require('../lib/invitations.delete');
const GET = require('../lib/invitations.get');

module.exports = manageMethods(Model, {
  POST,
  GET,
  DELETE
});
