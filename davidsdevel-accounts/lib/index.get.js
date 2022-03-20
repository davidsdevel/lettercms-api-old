module.exports = async function() {
  const {
    req: {query, subdomain, isAdmin},
    res,
    Model: {Accounts},
    find
  } = this;

  if (isAdmin)
    return res.json(await find({
    ...query,
    accounts: true
  }, Accounts, {}));

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
  }, Accounts, conditions);

  res.json(data);
}
