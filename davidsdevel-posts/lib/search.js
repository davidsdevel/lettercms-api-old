const getFullUrl = require('./getFullUrl');
const appendOnFields = require('./appendOnFields');
const {posts: postsModel, blogs} = require('@lettercms/models')(['posts', 'blogs']);

module.exports = async function() {
  const {req: {subdomain, query, path}, res, find} = this;

  const {
    q,
    status,
    tag
  } = query;

  const conditions = {
    subdomain,
    $text: {$search: q}
  };

  if (status)
    condition.postStatus = status;

  if (tag)
    condition.tags = {
      $in: tag
    }

  if (query.fields)
    query.fields += ',published,postStatus';

  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  const posts = await find({...query, path}, postsModel, conditions);

  posts.data = posts.data.map(e => {
    let fullUrl;

    if (e.postStatus === 'published')
      fullUrl = getFullUrl(e.url, urlID, e);

    return {
      ...e,
      fullUrl
    };
  });

  res.json(posts)
};