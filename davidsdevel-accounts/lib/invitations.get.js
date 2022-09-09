const {accounts: {Invitations}} = require('@lettercms/models')(['invitations']);
const {find} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const data = await find(Invitations, {subdomain}, query);

  res.json(data);
};
