const {accounts: {Accounts}} = require('@lettercms/models')(['accounts']);
const {findOne} = require('@lettercms/utils/lib/findHelpers/accounts');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {account} = req;

  const data = await findOne(Accounts, {_id: accounts}, query);

  if (data === null)
    return res.sendStatus(404);

  res.json(data);
};
