const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const exists = await accounts.Accounts.exists(this.req.query);

  if (exists)
    this.res.sendStatus(200);
  else
    this.res.sendStatus(404);
};
