<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

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