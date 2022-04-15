const {join} = require('path');
const crypto = require('crypto');

process.env.GOOGLE_APPLICATION_CREDENTIALS = join(process.cwd(), 'davidsdevel-accounts', 'firebaseAdmin.json');

const {accounts} = require('@lettercms/models');
const { initializeApp, applicationDefault} = require('firebase-admin/app');
const { getDatabase} = require('firebase-admin/database');
const jwt = require('jsonwebtoken');

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://lettercms-1-default-rtdb.firebaseio.com'
});

const db = getDatabase();
const ref = db.ref().child('verifications');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  try {
    const decoded = jwt.verify(req.query.token, process.env.JWT_AUTH);

    delete decoded.exp;
    delete decoded.iat;

    ref.push({
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
        ref.set({
          email: decoded.email,
          status: 'expired'
        });
        break;
      case 'invalid token':
        ref.set({
          email: decoded.email,
          status: 'bad-token'
        });
        break;
      case 'invalid signature':
        ref.set({
          email: decoded.email,
          status: 'invalid-signature'
        });
        break;
      default:
        throw err
    }
  } finally {
    res.send(`
      <html>
        <body>
          <script>window.close()</script>
        </body>
      </html>
    `);
  }
}