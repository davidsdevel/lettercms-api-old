const {exists, manageMethods} = require('@lettercms/utils');
const {accounts} = require('@lettercms/models');

module.exports = manageMethods({
  GET: exists(accounts.Accounts)
});