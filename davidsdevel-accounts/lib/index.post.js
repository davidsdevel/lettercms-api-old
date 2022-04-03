const {accounts} = require('@lettercms/models');
const jwt = require('jsonwebtoken');
const {sendMail} = require('@lettercms/utils');

module.exports = async function() {
  const {req,res} = this;
  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    subdomain,
    email
  } = req.body;

  const existsAccount = await accounts.Accounts.exists({
    email
  })

  if (existsAccount)
    return res.json({
      code: 'email-exists',
      message: 'Email already exists'
    });

  const code = jwt.sign(req.body, process.env.JWT_AUTH, { expiresIn: 60 * 5 });

  console.log(code)

  await sendMail(req.body.email, `${req.body.name} verifica tu cuenta - LetterCMS`, req.body);
  
  res.json({ status: 'OK' });
}
