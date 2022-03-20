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

  let condition = {};

  const isId = isValidObjectId(emailHex);
  console.log(isId)

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, "hex").toString('utf-8');

  let data = await findSingle({
    ...req.query,
    accounts: true
  }, Accounts, condition);

  if (data === null && isId)
    data = await findSingle(req.query, Accounts, {
      email: Buffer.from(emailHex, "hex").toString('utf-8')
    });

  if (data === null)
    return res.sendStatus(404);

  res.json(data);
}
