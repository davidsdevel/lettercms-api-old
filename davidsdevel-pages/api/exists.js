const {exists, manageMethods} = require('@lettercms/utils');
const {pages} = require('@lettercms/models');

module.exports = manageMethods({
  GET: exists(pages)
});
