const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const {
    req: {query, subdomain, isAdmin},
    res,
    find
  } = this;

  if (isAdmin)
    return res.json(await find({
    ...query,
    accounts: true
  }, accounts.Accounts, {}));

  const {
    role
  } = query;

  const conditions = {};

  if (role)
    conditions.role = role;
  if (subdomain)
    conditions.subdomain = subdomain;

  const data = await find({
    ...query,
    accounts: true
  }, accounts.Accounts, conditions);

  res.json(data);
}
