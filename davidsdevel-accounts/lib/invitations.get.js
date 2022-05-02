<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

module.exports = async function() {
  const {
    req: {subdomain, query},
    res,
    find
  } = this;

  const data = await find(query, accounts.Invitations, {subdomain});

  res.json(data)
}
