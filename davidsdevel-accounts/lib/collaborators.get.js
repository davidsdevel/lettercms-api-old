const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const {
    res,
    req,
    find
  } = this;

  const {subdomain, account} = req;

  const data = await find({
    ...req.query,
    accounts: true
  }, accounts.Accounts, {
    subdomain,
    $where: `this._id !== "${account}"`
  });

  res.json(data);
}
