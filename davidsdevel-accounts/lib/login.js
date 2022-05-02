<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

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
}