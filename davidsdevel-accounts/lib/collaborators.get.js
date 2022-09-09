const {accounts: {Accounts}} = require('@lettercms/models')(['accounts']);
const {find} = require('@lettercms/utils/lib/findHelpers/accounts');

module.exports = async function() {
  const {
    res,
    req
  } = this;

  const {subdomain, account, path} = req;

  const conditions = {
    subdomain,
    _id: {
      $ne: account
    }
  }

  const data = await find(Accounts, conditions, req.query);

  res.json(data);
};
