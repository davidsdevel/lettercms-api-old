const PageSchema = require('./schema');
const {model} = require('mongoose');

const PageModel = model('BlogPage', PageSchema);

module.exports = PageModel;
