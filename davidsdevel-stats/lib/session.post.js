const {stats} = require('@lettercms/models');
const firebase = require('../../firebaseInit');
const {getDatabase} = require('firebase-admin/database');
const parser = require('ua-parser-js');

const app = firebase.init();
const db = getDatabase(app);
const ref = db.ref().child('stats');

module.exports = async function() {
  const {req, res} = this;

  const {
    routes,
    action
  } = req.body;

  const {subdomain} = req;

  const ua = req.headers['user-agent'];
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
};
