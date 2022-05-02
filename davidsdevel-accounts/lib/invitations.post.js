const {accounts, blogs} = require('@lettercms/models');
const {sendMail} = require('@lettercms/utils');

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

  const existsInvitation = await accounts.Invitations.exists({
    email: body.email
  });

  if (existsInvitation)
    return res.json({
      status: 'invitation-sent',
      message: `Invitation to "${body.email}" already sent`
    });

  await accounts.Invitations.create({
    ...body,
    subdomain
  });

  const token = Buffer.from(body.email).toString('hex');

  const {title} = await blogs.findOne({subdomain}, 'title');

  await sendMail(body.email, `Has sido invitado a colaborar en ${title} - LetterCMS`, {
    type: 'invitation',
    title,
    url:'https://lettercms-dashboard-staging.herokuapp.com/signin?token=' + token
  });

  res.json({
    status: 'OK'
  });
}
