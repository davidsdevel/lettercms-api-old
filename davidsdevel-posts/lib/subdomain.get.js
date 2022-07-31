const {posts: postModel, blogs} = require('@lettercms/models')(['posts', 'blogs']);
const getFullUrl = require('./getFullUrl');

const isDev = process.env.NODE_ENV !== 'production';
const ORIGIN = isDev ? 'http://localhost:3000' : 'https://lettercms-api-staging.herokuapp.com';

module.exports = async function() {
  const {
    req,
    res,
    find
  } = this;

  const {subdomain, path} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  if (status)
    condition.postStatus = status;

  if (req.query.fields)
    req.query.fields += ',published,postStatus';

  const selectAccount = req.query.fields?.split(',').filter(e => e.includes('author.')).map(e => e.split('.')[1]).join(' ');

  const posts = await find({
    ...req.query,
    posts:true,
    path,
    sort: req.query.status === 'published' ? 'published' : req.query.sort || 'created',
    populate: {
    path: 'BlogAccount',
    select: selectAccount
  }}, postModel, condition);

  const draft = await postModel.countDocuments({subdomain, postStatus: 'draft'});
  const published = await postModel.countDocuments({subdomain, postStatus: 'published'});
  const imported = await postModel.countDocuments({subdomain, postStatus: 'imported'});

  posts.total = {
    draft,
    published,
    imported,
    all: draft + published + imported
  };

  posts.data = posts.data.map(e => {
    let fullUrl;

    if (e.postStatus === 'published')
      fullUrl = getFullUrl(e.url, urlID, e);

    return {
      ...e,
      fullUrl
    };
  });
  
  if (req.get('origin') === ORIGIN)
    posts.recommended = await postModel.findOne(condition, null, {views: 'asc'});

  res.json(posts);
};