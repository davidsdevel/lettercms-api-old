const {manageMethods, exists} = require('@lettercms/utils');
const {posts} = require('@lettercms/models');

module.exports = manageMethods({
  GET: exists(posts)
});