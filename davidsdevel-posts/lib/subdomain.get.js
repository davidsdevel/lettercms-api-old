const {posts: postModel, blogs} = require('@lettercms/models')(['posts', 'blogs']);
const getFullUrl = require('./getFullUrl');

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

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

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
      path: 'author',
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
      fullUrl = getFullUrl(e.url, urlID, e, mainUrl);

    return {
      ...e,
      fullUrl
    };
  });

  res.json(posts);
};