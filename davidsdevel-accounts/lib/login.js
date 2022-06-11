<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc

process.env.GOOGLE_APPLICATION_CREDENTIALS = join(process.cwd(), 'davidsdevel-accounts', 'firebaseAdmin.json');

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://lettercms-1-default-rtdb.firebaseio.com'
});

module.exports = async function() {
  const {
    req: {
      isAdmin,
      body
    },
    res
  } = this;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    email,
    password
  } = body;

  const data = await accounts.Accounts.login(email, password);

  if (body._includeFirebase) {
    const auth = getAuth();

    data.firebaseToken = await auth.createCustomToken('lettercms');
  }

  res.json(data);
}