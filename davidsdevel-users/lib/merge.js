module.exports = async function() {
  const {
    req: {
      subdomain,
      body: {
        from,
        to
      }
    },
    res,
    Model,
  } = this;

  const user1 = await Model.findOne({
    _id: from
  });

  if (!user1)
    return res.json({
      status: 'no-user',
      message: 'Merging user not found'
    });

  const user2 = await Model.findOne({
    _id: to
  });

  if (!user2)
    return res.json({
      status: 'no-user',
      message: 'Merged user not found'
    });

  await Model.updateOne({
    _id: to
  }, user2);

  await Model.deleteOne({
    _id: from
  });

  res.json({
    status: 'OK'
  });
}