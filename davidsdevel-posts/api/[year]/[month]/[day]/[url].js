const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require("../../../../lib/database");
const GET = require('../../../../lib/find');

module.exports = manageMethods(Model, {
	GET
});
