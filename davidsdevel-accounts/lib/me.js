const {accounts} = require(process.cwd() + '/mongo');
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res,
    findSingle
  } = this;

  const {
    emailHex
  } = req.query;

  const {account} = req;

  let data = await findSingle({
    ...req.query,
    accounts: true
  }, accounts.Accounts, {_id: account});

  if (data === null)
    return res.sendStatus(404);

  res.json(data);
}
