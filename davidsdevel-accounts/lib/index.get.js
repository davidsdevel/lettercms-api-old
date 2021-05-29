module.exports = async function() {
  const {
    req: {query, subdomain},
    res,
    Model: {Accounts},
    find
  } = this;

  const {
    role
  } = query;

  const conditions = {};

  if (role)
    conditions.role = role;
  if (subdomain)
    conditions.subdomain = subdomain;

  const data = await find(Object.assign({accounts: true}, query), Accounts, conditions);

  res.json(data);
}
