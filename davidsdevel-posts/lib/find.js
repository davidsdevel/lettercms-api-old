const {posts: postsModel, blogs} = require('@lettercms/models')(['posts', 'blogs', 'accounts']);
const {isValidObjectId} = require('mongoose');
const {findOne} = require('@lettercms/utils/lib/findHelpers/posts');

const generateConditions = query => {
  const conditions = {};

  if (query.category)
    conditions.category = query.category;
  if (query.day)
    conditions.$where = `this.published.getDate() === ${query.day}`;
  if (query.month) {
    let str = `this.published.getMonth() === ${query.month - 1}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }
  if (query.year) {
    let str = `this.published.getFullYear() === ${query.year}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }
};

module.exports = async function() {
  const {req: {subdomain, query}, res, findSingle} = this;

  const {
    url
  } = query;

  let conditions = {};

  const isId = isValidObjectId(url) && !url.includes('-');

  if (isId)
    conditions._id = url;
  else
    conditions = {
      ...generateConditions(query),
      subdomain,
      url
    };

  const posts = await postsModel.exists(conditions);

  if (!posts)
    return res.status(404).json({
      status: 'not-found'
    });

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  const data = await findOne(postsModel, conditions, {
    ...query,
    urlID,
    mainUrl
  });


  res.json(data);
};
