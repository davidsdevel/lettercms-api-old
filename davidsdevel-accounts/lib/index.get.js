const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const {
    req: {query, subdomain, isAdmin, path},
    res,
    find
  } = this;

  if (isAdmin)
    return res.json(await find({
    ...query,
    path,
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
    path,
    accounts: true
  }, accounts.Accounts, conditions);

  const collaborator = await accounts.Accounts.countDocuments({subdomain, role: 'collaborator'});
  const single = await accounts.Accounts.countDocuments({subdomain, role: 'single'});

  data.total = {
    collaborator,
    single,
    all: collaborator + single
  };


  res.json(data);
};
