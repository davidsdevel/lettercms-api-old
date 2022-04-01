const {manageMethods, exists} = require(process.cwd() + '/utils');

module.exports = manageMethods({
  GET: exists
});