const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res, findSingle, Model} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  let deleteCondition = {};

  if (isId)
    deleteCondition._id = url;
  else {
    deleteCondition.url = url;
    deleteCondition.subdomain = subdomain;
  }

  await Model.deleteOne(deleteCondition);

  res.json({
    status: 'OK'
  });
}
