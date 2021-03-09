module.exports = async function() {
  const {req, res, Model} = this;

  const {
    sessionTime,
    routes
  } = req.body;

  const {subdomain} = req;

  if (routes.length === 1) {
    //Update Bounce Rate
    const {totalViews, bounces} = await Model.Stats.findOne({subdomain});

    const bounceRate = bounces / totalViews * 100;

    await Model.Stats.updateOne({subdomain}, {
      bounceRate: bounceRate.toFixed(2),
      bounces: bounces + 1
    });
  }

  await Model.Sessions.create({
    sessionTime,
    routes,
    subdomain
  });

  res.json({
    message: 'OK'
  });
}
