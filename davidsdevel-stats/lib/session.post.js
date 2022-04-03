const {stats} = require('@lettercms/models');

module.exports = async function() {
  const {req, res, Model} = this;

  const {
    sessionTime,
    routes
  } = req.body;

  const {subdomain} = req;

  if (routes.length === 1) {
    //Update Bounce Rate
    const {totalViews, bounces} = await posts.Stats.findOne({subdomain});

    const bounceRate = bounces / totalViews * 100;

    await posts.Stats.updateOne({subdomain}, {
      bounceRate: bounceRate.toFixed(2),
      bounces: bounces + 1
    });
  }

  await posts.Sessions.create({
    sessionTime,
    routes,
    subdomain
  });

  res.json({
    status: 'OK'
  });
}
