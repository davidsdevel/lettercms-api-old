const {accounts: {Accounts}} = require('@lettercms/models')(['accounts']);

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
  }, Accounts, {
    subdomain,
    _id: {
      $ne: account
    }
  });

  res.json(data);
};
