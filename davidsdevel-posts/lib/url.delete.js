const {posts} = require('@lettercms/models');
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res} = this;

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

  await posts.deletePost(deleteCondition);

  res.json({
    status: 'OK'
  });
};