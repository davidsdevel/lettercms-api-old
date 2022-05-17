const {exists, manageMethods} = require('@lettercms/utils');
const {users} = require('@lettercms/models');

module.exports = manageMethods({
  GET: exists(users)
});