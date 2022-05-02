<<<<<<< HEAD
const {accounts} = require(process.cwd() + '/mongo');
=======
const {accounts} = require('@lettercms/models');
>>>>>>> 6baba5a4ede63f76da4bb88754918282eebfd2dc
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

  let condition = {};

  const isId = isValidObjectId(emailHex);

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, "hex").toString('utf-8');

  let data = await findSingle({
    ...req.query,
    accounts: true
  }, accounts.Accounts, condition);

  if (data === null && isId)
    data = await findSingle(req.query, accounts.Accounts, {
      email: Buffer.from(emailHex, "hex").toString('utf-8')
    });

  if (data === null)
    return res.sendStatus(404);

  res.json(data);
}
