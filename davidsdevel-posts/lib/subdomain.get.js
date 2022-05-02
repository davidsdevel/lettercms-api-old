const {posts: postModel, blogs} = require('@lettercms/models');

const isDev = process.env.NODE_ENV !== 'production';

const ORIGIN = isDev ? 'http://localhost:3000' : 'https://lettercms-api-staging.herokuapp.com';

const getFullUrl = (url, urlID, data) => {
  if (urlID === '1')
    return `/${url}`;
  if (urlID === '2')
    return `/${data.category}/${url}`;

  const year = data.published.getFullYear();
  const month = data.published.getMonth() + 1;

  if (urlID === '3')
    return `/${year}/${month}/${url}`;

  const date = data.published.getDate();

  return `/${year}/${month}/${date}/${url}`;
}

module.exports = async function() {
  const {
    req,
    res,
    find
  } = this;

  const {subdomain} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  if (status)
    condition.postStatus = status;

  if (req.query.fields)
    req.query.fields += ',published';

  const posts = await find({...req.query, posts:true}, postModel, condition);

  posts.data = posts.data.map(e => {
    let fullUrl;

    if (e.postStatus === 'published')
      fullUrl = getFullUrl(e.url, urlID, e);

    return {
      ...e,
      fullUrl
    }
  });
  
  if (req.get('origin') === ORIGIN)
    posts.recommended = await postModel.findOne(condition, null, {views: 'asc'});

  res.json(posts);
}