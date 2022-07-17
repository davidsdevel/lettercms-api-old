const getFullUrl = require('./getFullUrl');
const appendOnFields = require('./appendOnFields');
const {posts, blogs, ab, accounts: {Accounts}} = require('@lettercms/models');


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

}

module.exports = async function() {
  const {req: {subdomain, query}, res, findSingle} = this;

  const {
    url,
    category,
    day,
    month,
    year
  } = query;

  let conditions = {}

  // If ID
  const isId = /[a-z,0-9]{12}/i.test(url) || /[a-z,0-9]{24}/i.test(url)

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

  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  if (query.fields)
    query.fields = appendOnFields(query.fields, 'authorEmail');

  const data = await  findSingle(query, posts, conditions);

  const {name, lastname} = Accounts.findOne({email: data.authorEmail}, 'name lastname');

  data.author = `${name} ${lastname}`;

  if (data.postStatus === 'published')
    data.fullUrl = getFullUrl(url, urlID, data);

  res.json(data);
};
