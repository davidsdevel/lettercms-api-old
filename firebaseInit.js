const {join} = require('path');
 
process.env.GOOGLE_APPLICATION_CREDENTIALS = join(process.cwd(), 'davidsdevel-accounts', 'firebaseAdmin.json');

const { initializeApp, applicationDefault } = require('firebase-admin/app');
 
class FirebaseInit {
  constructor() {
    this.app = null;
  }
  init() {
    if (!this.app)
      this.app = initializeApp({
        credential: applicationDefault(),
        databaseURL: 'https://lettercms-1-default-rtdb.firebaseio.com'
      });

    return this.app;
  }
}

let firebaseConnection

if ('FirebaseConnection' in global)
  firebaseConnection = global.FirebaseConnection;
else
  firebaseConnection = global.FirebaseConnection = new FirebaseInit();


module.exports = firebaseConnection;
