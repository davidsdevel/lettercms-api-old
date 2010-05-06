module.exports = async function() {
  const {
    res,
    req,
    find,
    Model: {Accounts}
  } = this;

  const {subdomain, account} = req;

  const data = await find({
    ...req.query,
    accounts: true
  }, Accounts, {
    subdomain,
    $where: `this._id !== "${account}"`
  });

  res.json(data);
}
