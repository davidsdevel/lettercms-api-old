const {users: usersModel} = require('@lettercms/models');

module.exports = async function() {
  const {req: {query, subdomain, path}, res, find} = this;


  const condition = {
    subdomain
  };

  const users = await find({...query, path}, usersModel, condition);

  res.json(users);
};