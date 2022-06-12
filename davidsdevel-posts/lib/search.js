const getFullUrl = require('./getFullUrl');
const appendOnFields = require('./appendOnFields');
const {posts: postsModel, blogs} = require('@lettercms/models');


module.exports = async function() {
  const {req: {subdomain, query, path}, res, search} = this;

  const {
    q,
    status
  } = query;

  console.log(q)

  const conditions = {
    subdomain,
    $text: {$search: q}
  };

  if (status)
    condition.postStatus = status;

  if (query.fields)
    query.fields += ',published';

  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  const posts = await search({...query, path}, postsModel, conditions);

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