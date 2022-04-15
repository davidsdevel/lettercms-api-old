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

  try {
    await sendMail(req.body.email, `${req.body.name} verifica tu cuenta - LetterCMS`, {
      type: 'verify',
      url: `https://lettercms-api-staging.herokuapp.com/api/account/verify?token=${code}`,
      ...req.body
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'Error Sending Email'
    })
  }
  
  res.json({ status: 'OK' });
}
