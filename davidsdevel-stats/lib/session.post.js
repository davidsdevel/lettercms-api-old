const {stats} = require('@lettercms/models');
const parser = require("ua-parser-js");

process.env.GOOGLE_APPLICATION_CREDENTIALS = join(process.cwd(), 'davidsdevel-accounts', 'firebaseAdmin.json');

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://lettercms-1-default-rtdb.firebaseio.com'
});

const db = getDatabase();
const ref = db.ref().child('stats');

module.exports = async function() {
  const {req, res} = this;

  const {
    sessionTime,
    routes,
    action
  } = req.body;

  const {subdomain} = req;

  const ua = req.headers["user-agent"];
  const {os} = parser(ua);

  const subdomainRef = ref.child(subdomain);

  if (action === 'start') {
    const statsData = await subdomainRef.get();

    const statsOs = statsData[os.name];

    const newStats = {
      activeUsers: statsData.activeUsers + 1,
      [os.name]: (statsOs || 0) + 1
    };

    await subdomainRef.set(newStats);

    return res.json({
      status: 'OK'
    });
  }

  if (action === 'end') {
    if (routes.length === 1) {
      //Update Bounce Rate
      const {bounces} = await stats.Stats.findOne({subdomain});
      
      await stats.Stats.updateOne({subdomain}, {
        bounces: bounces + 1
      });
    }

    /*await stats.Sessions.create({
      sessionTime,
      routes,
      subdomain
    });*/

    const statsData = await subdomainRef.get();

    const statsOs = statsData[os.name];

    const newStats = {
      activeUsers: statsData.activeUsers - 1,
      [os.name]: statsOs - 1
    };

    await subdomainRef.set(newStats);

    res.json({
      status: 'OK'
    });
  }
}
