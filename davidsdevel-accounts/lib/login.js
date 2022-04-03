const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const {
    isAdmin
  } = this.req;

  if (!isAdmin)
    return this.res.sendStatus(401);

  const {
    email,
    password
  } = this.req.body;

  const data = await accounts.Accounts.login(email, password);

  this.res.json(data);
}