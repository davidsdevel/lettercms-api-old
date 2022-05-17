const {users} = require('@lettercms/models');

module.exports = async function() {
  const {req: {
    subdomain,
    query: {
      id
    }
  }, res} = this;

  await users.deleteOne({_id: id, subdomain});

  res.json({
    status: 'OK'
  });
};
