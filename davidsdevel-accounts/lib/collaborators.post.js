const {accounts} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {
    req,
    res,
  } = this;

  const {subdomain} = req;

  await accounts.Accounts.createCollab(subdomain, req.body);

  //TODO: send email with verify token
  res.json({
    status: 'OK'
  });
}
