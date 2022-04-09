const {join} = require('path')

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
const ref = db.ref('verifications');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  try {
    const decoded = jwt.verify(req.query.token, process.env.JWT_AUTH);

    delete decoded.exp;
    delete decoded.iat;

    ref.set({
      email: decoded.email,
      name: decoded.name,
      status: 'verified'
    });

    const db = await accounts.Accounts.createAccount(subdomain, decoded);
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