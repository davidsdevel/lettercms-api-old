const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res
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

  await this.Model.updateOne(condition, req.body);

  res.json({
    message: 'OK'
  });
}