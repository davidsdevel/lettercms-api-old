const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res,
    findSingle,
    Model: {Accounts}
  } = this;

  const {
    emailHex
  } = req.query;
  const {account} = req;

  let data = await findSingle({
    ...req.query,
    accounts: true
  }, Accounts, {_id: account});

  if (data === null)
    return res.sendStatus(404);

  res.json(data);
}
