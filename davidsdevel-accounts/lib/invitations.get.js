const {accounts} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {
    req: {subdomain, query},
    res,
    find
  } = this;

  const data = await find(query, accounts.Invitations, {subdomain});

  res.json(data)
}
