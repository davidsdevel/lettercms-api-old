const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const {
    res,
    req,
    find
  } = this;

  const {subdomain, account, path} = req;

  const data = await find({
    ...req.query,
    path,
    accounts: true
  }, accounts.Accounts, {
    subdomain,
    _id: {
      $ne: account
    }
  });

  res.json(data);
};
