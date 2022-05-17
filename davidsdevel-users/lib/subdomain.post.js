const {users} = require('@lettercms/models');

module.exports = async function() {
  const {req: {subdomain, body}, res} = this;

  const data = await users.create({...body, subdomain});

  res.json({
    status: 'OK',
    data
  });
};