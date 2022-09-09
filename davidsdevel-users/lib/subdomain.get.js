const {users: {Users}} = require('@lettercms/models')(['users']);
const {find} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {req: {query, subdomain}, res} = this;

  const condition = {
    subdomain
  };

  const users = await find(Users, condition, query);

  res.json(users);
};