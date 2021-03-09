const BlogSchema = require('./schema');
const {model} = require('mongoose');

const BlogModel = model('Blog', BlogSchema);

module.exports = BlogModel;
