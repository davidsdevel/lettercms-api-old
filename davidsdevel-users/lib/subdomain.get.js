const {users: usersModel} = require('@lettercms/models');

module.exports = async function() {
  const {req: {query, subdomain}, res, find} = this;


  const condition = {
    subdomain
  };

  const users = await find(query, usersModel, condition);

  res.json(users);
};