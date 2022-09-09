const {blogs, posts, users: {Ratings}} = require('@lettercms/models')(['posts', 'ratings', 'blogs']);
const {isValidObjectId} = require('mongoose');
const revalidate = require('@lettercms/utils/lib/revalidate');
const {getFullUrl} = require('@lettercms/utils/lib/posts');

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

  const p = await posts.findOne(deleteCondition, 'url category published', {lean: true});
  const post = p._id;

  await posts.deletePost(deleteCondition);
  await Ratings.deleteMany({subdomain, post});
  
  blogs.find({subdomain}, 'mainUrl url', {lean: true})
    .then(blog => {
      const _url = mainUrl + getFullUrl(p, blog.url);

      revalidate(subdomain, _url);
      revalidate(subdomain, e.mainUrl);
    });

  res.json({
    status: 'OK'
  });
};