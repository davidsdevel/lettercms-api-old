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

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, "hex").toString('utf-8');


  await Accounts.updateOne(condition, req.body);
  
  console.log(condition)

  res.json({
    message: 'OK'
  });
}
