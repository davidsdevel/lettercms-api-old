const getFullUrl = require('./getFullUrl');
const appendOnFields = require('./appendOnFields');
const {posts, blogs, accounts: {Accounts}} = require('@lettercms/models')(['posts', 'blogs', 'accounts']);
const {isValidObjectId} = require('mongoose');


const generateConditions = query => {
  const conditions = {};

  if (query.category)
    conditions.category = category;
  if (query.day)
    conditions.$where = `this.published.getDate() === ${day}`;
  if (query.month) {
    let str = `this.published.getMonth() === ${month - 1}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }
  if (query.year) {
    let str = `this.published.getFullYear() === ${year}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }

};

module.exports = async function() {
  const {req: {subdomain, query}, res, findSingle} = this;

  const {
    url,
    category,
    day,
    month,
    year
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

  const existsPost = await posts.exists(conditions);

  if (!existsPost)
    return res.status(404).json({
      status: 'not-found'
    });

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  const select = query.fields?.split(',').filter(e => e.includes('author.')).map(e => e.split('.')[1]).join(' ');
  
  const data = await  findSingle({
    ...query,
    populate: {
      path: 'author',
      select
    }
  }, posts, conditions);

  if (data.postStatus === 'published')
    data.fullUrl = getFullUrl(url, urlID, data, mainUrl);

  res.json(data);
};
