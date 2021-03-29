module.exports = async function() {
  const {res, req, find, Model} = this;

  const {subdomain} = req;

  const data = await find(Object.assign({}, req.query, {accounts: true}), Model, {
    subdomain,
    $or: [
      {role: 'collaborator'},
      {role: 'single'}
    ]
  });

  res.json(data);
}
