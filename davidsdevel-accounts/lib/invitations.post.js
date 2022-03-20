module.exports = async function() {
  const {
    req: {subdomain, body},
    res,
    Model: {Invitations, Accounts}
  } = this;

  const existsAccount = await Accounts.exists({
    email: body.email
  });

  if (existsAccount)
    return res.json({
      status: 'account-exists',
      message: 'Accounts already exists'
    });

  const existsInvitation = await Accounts.exists({
    email: body.email
  });

  if (existsInvitation)
    return res.json({
      status: 'invitation-sent',
      message: `Invitation to "${body.email}" already sent`
    });

  const {_id} = await Invitations.create({
    ...body,
    subdomain
  });

  //TODO: Send Email

  res.json({
    id:_id,
    status: 'OK'
  })
}
