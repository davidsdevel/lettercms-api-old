const {stats} = require('@lettercms/models');
const firebase = require('../../firebaseInit');
const {getDatabase} = require('firebase-admin/database');
const parser = require('ua-parser-js');

const app = firebase.init();
const db = getDatabase(app);
const ref = db.ref().child('stats');

/*fetch('http://localhost:3009/api/stats/session', {
  method: 'POST',
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJkb21haW4iOiJkYXZpZHNkZXZlbCIsImFjY291bnQiOiI2MjljNDM1M2U1ZDQ4NzA3NDQ0YzVmZjIiLCJpYXQiOjE2NTQ5MDUxNjN9.ErUqAL02Zm_cO8q-8EJD9g6WPe55hxm1bC8Kgvuv4CM',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'end',
    routes: ['route1', 'route2'],
    sessionTime: 600
  })
})*/

module.exports = async function() {
  const {req, res} = this;

  const {
    routes,
    action,
    sessionTime,
    entryChannel
  } = req.body;

  const {subdomain} = req;

  const ua = req.headers['user-agent'];


  const {os} = parser(ua);
  const device = /Android|iPhone|iPad/.test(ua) ? 'mobile' : 'desktop';

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

    await stats.Sessions.create({
      sessionTime,
      routes,
      subdomain,
      device,
      entryChannel
    });

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
};
