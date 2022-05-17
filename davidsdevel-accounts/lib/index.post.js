const {accounts} = require('@lettercms/models');
const jwt = require('jsonwebtoken');
const {sendMail} = require('@lettercms/utils');
const {writeFileSync} = require('fs');

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
  });

  if (existsAccount)
    return res.json({
      code: 'email-exists',
      message: 'Email already exists'
    });

  const code = jwt.sign(req.body, process.env.JWT_AUTH, { expiresIn: 60 * 5 });

  try {
    if (process.env.NODE_ENV !== 'production')
      writeFileSync('verificationURL.txt', `https://lettercms-api-staging.herokuapp.com/api/account/verify?token=${code}&e=${Buffer.from(req.body.email).toString('hex')}`);
    else
      await sendMail(req.body.email, `${req.body.name} verifica tu cuenta - LetterCMS`, {
        type: 'verify',
        url: `https://lettercms-api-staging.herokuapp.com/api/account/verify?token=${code}&e=${Buffer.from(req.body.email).toString('hex')}`,
        ...req.body
      });
  } catch(err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error Sending Email'
    });
  }
  
  res.json({ status: 'OK' });
};
