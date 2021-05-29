module.exports = async function() {
  const {
    res,
    req,
    find,
    Model: {Accounts}
  } = this;

  const {subdomain} = req;

  const data = await find(Object.assign({}, req.query, {accounts: true}), Accounts, {
    subdomain,
    $or: [
      {role: 'collaborator'},
      {role: 'single'}
    ]
  });

  res.json(data);
}
