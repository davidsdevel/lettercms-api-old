const {users} = require('@lettercms/models');

module.exports = async function() {
  const {req, res, find} = this;

  const {
    status
  } = req.query;
  const {subdomain} = req;

  const condition = {
    subdomain
  };

  const users = await find(req.query, users, condition);

  res.json(users);
}