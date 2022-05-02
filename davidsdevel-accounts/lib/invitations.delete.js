<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

module.exports = async function() {
  const {
    req: {
      body: {
        email,
        id
      }
    },
    res
  } = this;

  let options = {};

  if (id)
    options._id = id;
  else if (email)
    options.email = email;
  else
    return res.status(400).json({
      status: 'no-id',
      message: 'Request must have "id" or "email"'
    })

  const existsInvitation = await accounts.Invitations.exists(options);

  if (!existsInvitation)
    return res.status(404).json({message: 'Invitation not found'});

  await accounts.Invitations.deleteOne(options);

  res.json({
    status: 'OK',
    message: `Invitation ${id ? id : `to "${email}"`} deleted`
  });
}