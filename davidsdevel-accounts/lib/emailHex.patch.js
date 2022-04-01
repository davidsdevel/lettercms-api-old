const {accounts} = require(process.cwd() + '/mongo');
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {
    isAdmin
  } = req;

  if (req.body.subdomain && !isAdmin)
    return res.status(403).json({
      message: 'Cannot change subdomain'
    });

  const {
    emailHex
  } = req.query;

  let condition = {};

  const isId = isValidObjectId(emailHex);

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, "hex").toString('utf-8');

  await accounts.Accounts.updateOne(condition, req.body);

  res.json({
    status: 'OK'
  });
}
