const {accounts} = require('@lettercms/models');
const firebase = require('@firebase/admin');
const jwt = require('jsonwebtoken');

firebase.database().ref("verification");

module.exports = async function() {
  const {
    req,
    res
  } = this;

  try {
    const decoded = jwt.verify(req.query.token, process.env.JWT_AUTH);

    delete decoded.exp;
    delete decoded.iat;

    db.push({
      email: decoded.email,
      name: decoded.name,
      status: 'verified'
    });

    const db = await accounts.Accounts.createAccount(subdomain, decoded);
  } catch(err) {
    switch(err.message) {
      case 'jwt expired':
        db.push({
          email: decoded.email,
          status: 'expired'
        });
        break;
      case 'invalid token':
        db.push({
          email: decoded.email,
          status: 'bad-token'
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