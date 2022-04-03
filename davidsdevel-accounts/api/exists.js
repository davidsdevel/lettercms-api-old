const {exists, manageMethods} = require('@lettercms/utils');

module.exports = manageMethods({
  GET: exists
});