const {users: {Users}} = require('@lettercms/models')(['users']);

module.exports = async function() {
  const {req: {query, subdomain, path}, res, find} = this;


  const condition = {
    subdomain
  };

  const users = await find({...query, path}, Users, condition);

  res.json(users);
};