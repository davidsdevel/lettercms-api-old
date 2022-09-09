const {posts: postModel, blogs, users: {Users, Ratings}} = require('@lettercms/models')(['posts', 'blogs', 'users', 'ratings']);
const {find: findRecommendations} = require('@lettercms/utils/lib/findHelpers/recommendations');
const {find: findPosts} = require('@lettercms/utils/lib/findHelpers/posts');

const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res,
    find
  } = this;

  const {subdomain, path} = req;
  const {id} = req.query;
  
  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  const haveModel = isValidObjectId(id) ? await Users.exists({_id: id, hasRecommendations: true}) : false;

  let posts = null;

  if (haveModel) {
    posts = await findRecommendations(Ratings, {userID: id}, {
      ...req.query,
      mainUrl,
      urlID
    });
  } else {
    const condition = {
      subdomain,
      postStatus: 'published'
    };

    posts = await findPosts(postModel, condition, {
      ...req.query,
      mainUrl,
      urlID
    });
  }

  res.json(posts);
};