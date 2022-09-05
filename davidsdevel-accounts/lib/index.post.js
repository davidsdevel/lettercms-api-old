const {accounts} = require('@lettercms/models')(['accounts']);
const {sendMail} = require('@lettercms/utils');
const {scryptSync, randomBytes} = require('crypto');
const {writeFileSync} = require('fs');
const {join} = require('path');

const generateSecretHash = key => {
  const salt = randomBytes(8).toString('hex');
  const buffer = scryptSync(key, salt, 64);

  return `${buffer.toString('hex')}.${salt}`;
};

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
      status: 'email-exists',
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

  const key = generateSecretHash(process.env.JWT_AUTH); //jwt.sign(req.body, process.env.JWT_AUTH, { expiresIn: 60 * 5 });
  const hex = Buffer.from(JSON.stringify(req.body)).toString('hex');

  try {
    if (process.env.NODE_ENV !== 'production')
      writeFileSync(join(process.cwd(), 'verificationURL.txt'), req.body.code);
    else
      await sendMail(req.body.email, `${req.body.name} verifica tu cuenta - LetterCMS`, {
        type: 'verify',
        ...req.body
      });
  } catch(err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error Sending Email'
    });
  }
  
  res.json({
    status: 'OK',
    token: `${key}@${hex}`
  });
};
