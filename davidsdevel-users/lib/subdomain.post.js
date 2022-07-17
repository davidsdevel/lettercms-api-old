const {users} = require('@lettercms/models');

module.exports = async function() {
  const {req: {subdomain, body}, res} = this;

  const {_id} = await users.create({...body, subdomain});

  res.json({
    status: 'OK',
    id: _id
  });
};