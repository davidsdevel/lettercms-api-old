const {accounts, blogs} = require('@lettercms/models')(['invitations', 'blog', 'accounts']);
const {sendMail} = require('@lettercms/utils');
const {writeFileSync} = require('fs');
const {join} = require('path');
const jwt = require('jsonwebtoken');

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

  const blog = await blogs.findOne({subdomain}, 'title', {lean: true});
  const token = jwt.sign({subdomain}, process.env,JWT_AUTH);

  const {_id} = await accounts.Invitations.create({
    ...body,
    subdomain,
    blog: blog._id
  });

  
  if (process.env.NODE_ENV !== 'production')
    writeFileSync(join(process.cwd(), 'invitation.txt'), _id.toString());
  else
    await sendMail(body.email, `Has sido invitado a colaborar en ${blog.title} - LetterCMS`, {
      type: 'invitation',
      title,
      url: `https://lettercms-dashboard-davidsdevel.vercel.app/invitation/${_id}?token=${token}`
    });

  res.json({
    status: 'OK'
  });
};
