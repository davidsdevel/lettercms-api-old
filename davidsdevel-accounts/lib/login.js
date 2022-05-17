const {accounts} = require('@lettercms/models');
const firebase = require('../../firebaseInit');
const {getAuth} = require('firebase-admin/auth');

const app = firebase.init();

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
    const auth = getAuth(app);

    data.firebaseToken = await auth.createCustomToken('lettercms');
  }

  res.json(data);
};