<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

module.exports = async function() {
  const {
    req:{query},
    res,
    findSingle
  } = this;

  const {id} = query;

  const data = await findSingle(query, accounts.Invitations, {_id: id});

  if (data === null)
    return res.status(404).json({message: 'Invitation not found'});

  return res.json(data);
}