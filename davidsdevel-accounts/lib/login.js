const {accounts} = require('@lettercms/models');

module.exports = async function() {
  const {
    req: {
      isAdmin,
      body
    },
    res
  } = this;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    email,
    password
  } = body;

  const data = await accounts.Accounts.login(email, password);

  res.json(data);
};