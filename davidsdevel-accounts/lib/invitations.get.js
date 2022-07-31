const {accounts} = require('@lettercms/models')(['invitations']);

module.exports = async function() {
  const {
    req: {subdomain, query, path},
    res,
    find
  } = this;

  const data = await find({
    ...query,
    path
  }, accounts.Invitations, {subdomain});

  res.json(data);
};
