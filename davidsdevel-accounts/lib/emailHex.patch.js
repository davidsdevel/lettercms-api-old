const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res,
    Model: {Accounts}
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
  console.log(isId)

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, "hex").toString('utf-8');

  console.log(await Accounts.findOne(condition))

  await Accounts.updateOne(condition, req.body);

  res.json({
    status: 'OK'
  });
}
