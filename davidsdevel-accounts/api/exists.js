const {accounts} = require('@lettercms/models')(['accounts']);
const {exists, manageMethods} = require('@lettercms/utils');

module.exports = manageMethods({
  GET: exists(accounts.Accounts)
});