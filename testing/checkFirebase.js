const {firebase} = require('@lettercms/utils');
const {getDatabase} = require('firebase-admin/database');


const checkVerification = async email => {
  firebase.init()
  
  const db = getDatabase();
  const ref = db.ref().child('verifications');
  
  const e = await ref.once('value');
  const entries = Object.entries(e.val());

  let match = null;
  for (let entry of entries) {
    const key = entry[0];
    const value = entry[1];

    if (value.email === email) {
      match = value;
      ref.child(key).remove();
      break;
    }
  }

  return Promise.resolve(match);
}

module.exports = {
  checkVerification
}
