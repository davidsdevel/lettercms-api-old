const {accounts} = require('@lettercms/models')(['accounts']);

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

  if (!email)
    return res.status(400).json({
      status: 'bad-request',
      message: 'Email must be set'
    });

  if (!password)
    return res.status(400).json({
      status: 'bad-request',
      message: 'Password must be set'
    });

  const data = await accounts.Accounts.login(email, password);

  res.json(data);
};