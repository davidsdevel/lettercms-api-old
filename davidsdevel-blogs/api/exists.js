const {exists, manageMethods} = require('@lettercms/utils');
const {blogs} = require('@lettercms/models');

module.exports = manageMethods({
  GET: exists(blogs)
});