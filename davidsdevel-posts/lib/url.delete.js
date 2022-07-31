const {posts, users: {Ratings}} = require('@lettercms/models')(['posts', 'ratings']);
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

  let post = deleteCondition._id;

  if (!deleteCondition._id) {
    const p = posts.findOne(deleteCondition, '_id', {lean: true});
    post = p._id;
  }

  await Ratings.deleteMany({subdomain, post});
  await posts.deletePost(deleteCondition);

  res.json({
    status: 'OK'
  });
};