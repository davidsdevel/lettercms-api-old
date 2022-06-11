const crypto = require('crypto');

const {accounts} = require('@lettercms/models');
const firebase = require('../../firebaseInit');
const { getDatabase } = require('firebase-admin/database');
const jwt = require('jsonwebtoken');

const app = firebase.init();
const db = getDatabase(app);
const ref = db.ref().child('verifications');

const isDev = process.env.NODE_ENV !== 'production';

let sendVerification = isDev ? console.log : ref.push;

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

    sendVerification({
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
<<<<<<< HEAD
        ref.push({
          email: decoded.email,
=======
        sendVerification({
          email: Buffer.from(req.query.e, 'hex').tostring('utf-8'),
>>>>>>> development
          status: 'expired'
        });
        break;
      case 'invalid token':
<<<<<<< HEAD
        ref.push({
          email: decoded.email,
=======
        sendVerification({
          email: Buffer.from(req.query.e, 'hex').tostring('utf-8'),
>>>>>>> development
          status: 'bad-token'
        });
        break;
      case 'invalid signature':
<<<<<<< HEAD
        ref.push({
          email: decoded.email,
=======
        sendVerification({
          email: Buffer.from(req.query.e, 'hex').tostring('utf-8'),
>>>>>>> development
          status: 'invalid-signature'
        });
        break;
      default:
        throw err;
    }
  } finally {
    res.send('<html><body><script>window.close()</script></body></html>');
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> development
