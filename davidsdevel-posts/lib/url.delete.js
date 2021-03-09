const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res, Model} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  const deleteCondition = {};

  if (isId)
    deleteCondition._id = url;
  else {
    deleteCondition.url = url;
    deleteCondition.subdomain = subdomain;
  }

  await Model.deletePost(deleteCondition);

  res.json({
    message: 'OK'
  });
}