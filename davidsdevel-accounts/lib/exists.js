<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

module.exports = async function() {
  const exists = await accounts.Accounts.exists(this.req.query);

  if (exists)
    this.res.sendStatus(200);
  else
    this.res.sendStatus(404);
}
