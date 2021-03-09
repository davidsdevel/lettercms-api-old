module.exports = async function() {
  const {
    Model,
    req,
    res
  } = this;

  const {
    token
  } = req.body;

  const _id = Buffer.from(token, 'hex').toString('utf-8');

  const exists = await Model.Accounts.exists({_id});

  if (!exists)
    return res.status(400).json({
      message: 'Expired Token'
    });

  await Model.Accounts.updateOne({_id}, {
    verified: true
  });
  
  res.json({
    message: 'OK'
  });
}