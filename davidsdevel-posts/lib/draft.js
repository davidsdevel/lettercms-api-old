const {posts, users: {Ratings}, blogs} = require('@lettercms/models')(['posts', 'ratings', 'blogs']);
const {isValidObjectId} = require('mongoose');
const revalidate = require('@lettercms/utils/lib/revalidate');
const {getFullUrl} = require('@lettercms/utils/lib/posts');

module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  const {_id: postID, url: _url, postStatus, category, published, views} = await posts.findOneAndUpdate(updateCondition, {postStatus: 'draft'}, {select: '_id url postStatus category published views'});

  if (postStatus === 'draft')
    return res.status(400).json({
      status: 'posts/post-already-draft'
    });

  Ratings.deleteMany({post: postID});
  const {mainUrl, url: urlID} = await blogs.find({subdomain}, 'mainUrl url', {lean: true});

  if (views > 0) {
    const revalidateUrl = mainUrl + getFullUrl({category, published,url: _url}, urlID);
    revalidate(subdomain, revalidateUrl);
  }

  revalidate(subdomain, mainUrl);

  res.json({
    status: 'OK',
    id: postID
  });
};