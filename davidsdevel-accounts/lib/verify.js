const crypto = require('crypto');
const {accounts} = require('@lettercms/models')(['accounts']);
const {scryptSync, timingSafeEqual} = require('crypto');

const compare = (a, b) => {
  const [pass, salt] = b.split('.');

  const buffer = scryptSync(a, salt, 64);

  return timingSafeEqual(Buffer.from(pass, 'hex'), buffer);
};

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {token} = req.body;

  if (!token)
    return res.status(400).json({
      status: 'bad-request',
      message: 'You must set a valid code'
    });

  const [key, dataHex] = token.split('@');

  const isValid = compare(process.env.JWT_AUTH, key);

  if (!isValid)
    return res.json({
      status: 'invalid-token'
    });

  const decoded = JSON.parse(Buffer.from(dataHex, 'hex').toString('utf-8'));
  const {email} = decoded;

  try {

    const existsAccount = await accounts.Accounts.exists({
      email
    });

    if (existsAccount)
      return res.json({
        status: 'aready-exists',
        message: `Account with email "${email}" already exists`
      });

    const emailHash = Buffer.from(email).toString('hex');

    await accounts.Accounts.createAccount({
      photo: `https://avatar.tobi.sh/${emailHash}.svg?text=${decoded.name[0]+decoded.lastname[0]}&size=250`,
      ...decoded
    });

    res.json({
      status: 'OK'
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      status: 'verification-error',
      message: 'Unable to verify account'
    });
  }
};

/*const crypto = require('crypto');
const Pusher = require("pusher");
const {accounts} = require('@lettercms/models');
const jwt = require('jsonwebtoken');

const isDev = process.env.NODE_ENV !== 'production';

const pusher = new Pusher({
  appId: "1427382",
  key: "9ae451a4e165bf007ec4",
  secret: "ff37ec2f501a38ed7718",
  cluster: "us2",
  useTLS: true
});


module.exports = async function() {
  const {
    req,
    res
  } = this;

  if (!req.query.e)
    res.status(400).json({
      status: 'bad-request',
      message: 'You must set a valid "e" query into url'
    });

  try {
    const decoded = jwt.verify(req.query.token, process.env.JWT_AUTH);

    delete decoded.exp;
    delete decoded.iat;

    const existsAccount = await accounts.Accounts.exists({
      email: decoded.email
    });

    if (existsAccount)
      return res.json({
        status: 'aready-exists',
        message: `Account with email "${decoded.email}" already exists`
      });

    pusher.trigger(`lettercms-${process.env.NODE_ENV || 'development'}`, "verify", {
      email: decoded.email,
      name: decoded.name,
      status: 'verified'
    });

    const emailHash = crypto.createHash('md5').update(decoded.email).digest('hex');

    await accounts.Accounts.createAccount(req.subdomain, {
      photo: `https://avatar.tobi.sh/${emailHash}.svg?text=${decoded.name[0]+decoded.lastname[0]}&size=250`,
      ...decoded
    });
  } catch(err) {
    switch(err.message) {
      case 'jwt expired':
        pusher.trigger(`lettercms-${process.env.NODE_ENV || 'development'}`, "verify", {
          email: Buffer.from(req.query.e, 'hex').toString('utf-8'),
          status: 'expired'
        });
        break;
      case 'invalid token':
        pusher.trigger(`lettercms-${process.env.NODE_ENV || 'development'}`, "verify", {
          email: Buffer.from(req.query.e, 'hex').toString('utf-8'),
          status: 'bad-token'
        });
        break;
      case 'invalid signature':
        pusher.trigger(`lettercms-${process.env.NODE_ENV || 'development'}`, "verify", {
          email: Buffer.from(req.query.e, 'hex').toString('utf-8'),
          status: 'invalid-signature'
        });
        break;
      default:
        throw err;
    }
  } finally {
    res.send('<html><body><script>window.close()</script></body></html>');
  }
};
*/