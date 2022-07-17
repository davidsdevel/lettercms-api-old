const {accounts} = require('@lettercms/models');
const jwt = require('jsonwebtoken');
const {sendMail} = require('@lettercms/utils');
const {writeFileSync} = require('fs');
const {join} = require('path')

module.exports = async function() {
  const {req,res} = this;
  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    email,
    isSubscribeToNewsletter
  } = req.body;

  const existsAccount = await accounts.Accounts.exists({
    email
  });

  if (existsAccount)
    return res.json({
      code: 'email-exists',
      message: 'Email already exists'
    });


  if (isSubscribeToNewsletter) {
    try {
      await accounts.Accounts.create({
        email,
        isSubscribeToNewsletter
      });

      return res.json({
        status: 'OK'
      });

    } catch(err) {
      return res.status(500).json({
        message: 'Error al subscribir'
      });
    }
  }

  req.body.role = 'admin';

  const code = Buffer.from(JSON.stringify(req.body)).toString('hex'); //jwt.sign(req.body, process.env.JWT_AUTH, { expiresIn: 60 * 5 });

  try {
    if (process.env.NODE_ENV !== 'production')
      writeFileSync(join(process.cwd(), 'verificationURL.txt'), code);
    else
      await sendMail(req.body.email, `${req.body.name} verifica tu cuenta - LetterCMS`, {
        type: 'verify',
        code,
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
