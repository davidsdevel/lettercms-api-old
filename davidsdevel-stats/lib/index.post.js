module.exports = async function() {
  const {
    req,
    res,
    Model
  }  = this;

  const {
    subdomain
  } = req;

  const exists = await Model.Stats.exists({
    subdomain
  });

  if (exists)
    return res.status(400).json({
      message: `Stats already created`
    });

  await Model.Stats.create({
    subdomain
  });

  res.json({
    message: 'OK'
  });
}