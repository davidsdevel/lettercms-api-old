const {stats} = require('@lettercms/models');

module.exports = async function() {
  const {
    req,
    res
  }  = this;

  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    subdomain
  } = req.body;

  const exists = await stats.Stats.exists({
    subdomain
  });

  if (exists)
    return res.status(400).json({
      message: 'Stats already created'
    });

  await stats.Stats.create({
    subdomain
  });

  res.json({
    status: 'OK'
  });
};