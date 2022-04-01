const {users} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {
    req: {
      subdomain,
      body: {
        from,
        to
      }
    },
    res
  } = this;

  const user1 = await users.findOne({
    _id: from
  });

  if (!user1)
    return res.json({
      status: 'no-user',
      message: 'Merging user not found'
    });

  const user2 = await users.findOne({
    _id: to
  });

  if (!user2)
    return res.json({
      status: 'no-user',
      message: 'Merged user not found'
    });

  await users.updateOne({
    _id: to
  }, user2);

  await users.deleteOne({
    _id: from
  });

  res.json({
    status: 'OK'
  });
}