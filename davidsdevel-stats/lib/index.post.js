module.exports = async function() {
  const {
    req,
    res,
    Model
  }  = this;

  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    subdomain
  } = req.body;

  const exists = await Model.Stats.exists({
    subdomain
  });

  if (exists)
    return res.status(400).json({
      message: 'Stats already created'
    });

  await Model.Stats.create({
    subdomain
  });

  res.json({
    message: 'OK'
  });
}