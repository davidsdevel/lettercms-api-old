const {posts: postModel, blogs} = require('@lettercms/models')(['posts', 'blogs']);
const {find} = require('@lettercms/utils/lib/findHelpers/posts');

module.exports = async function() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const condition = {
    subdomain
  };

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  if (query.status)
    condition.postStatus = query.status;

  const posts = await find(postModel, condition, {
    ...query,
    urlID,
    mainUrl
  });

  res.json(posts);
};