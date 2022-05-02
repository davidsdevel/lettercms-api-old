<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

module.exports = async function() {
  const {
    req: {subdomain, body},
    res
  } = this;

  const existsAccount = await accounts.Accounts.exists({
    email: body.email
  });

  if (existsAccount)
    return res.json({
      status: 'account-exists',
      message: 'Accounts already exists'
    });

  const existsInvitation = await accounts.Accounts.exists({
    email: body.email
  });

  if (existsInvitation)
    return res.json({
      status: 'invitation-sent',
      message: `Invitation to "${body.email}" already sent`
    });

  const {_id} = await accounts.Invitations.create({
    ...body,
    subdomain
  });

  //TODO: Send Email

  res.json({
    id:_id,
    status: 'OK'
  })
}
