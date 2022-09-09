const {accounts: {Accounts}} = require('@lettercms/models')(['accounts']);
const {find} = require('@lettercms/utils/lib/findHelpers/accounts');

module.exports = async function() {
  const {
    req: {query, subdomain},
    res
  } = this;


  const {
    role
  } = query;

  const conditions = {};

  if (role)
    conditions.role = role;
  if (subdomain)
    conditions.subdomain = subdomain;

  const data = await find(Accounts, conditions, query);

  res.json(data);
};
