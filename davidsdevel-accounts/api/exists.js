const {exists, manageMethods} = require(process.cwd() + '/utils');

module.exports = manageMethods({
  GET: exists
});