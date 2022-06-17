const getFullUrl = require('./getFullUrl');
const appendOnFields = require('./appendOnFields');
const {posts, blogs, accounts: {Accounts}} = require('@lettercms/models');


module.exports = async function() {
  const {req: {subdomain, query}, res, findSingle} = this;

  const {
    url,
    category,
    day,
    month,
    year
  } = query;

  let {fields} = query;

  const conditions = {
    subdomain,
    url
  };

  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  if (category)
    conditions.category = category;
  if (day)
    conditions.$where = `this.published.getDate() === ${day}`;
  if (month) {
    let str = `this.published.getMonth() === ${month - 1}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }
  if (year) {
    let str = `this.published.getFullYear() === ${year}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }

  let data;
  if (fields)
    fields = appendOnFields(fields, 'subdomain');

  if (!category && !day && !month && !year) {
    const isId = /[a-z,0-9]{12}/i.test(url) || /[a-z,0-9]{24}/i.test(url);

    if (isId) {
      if (fields)
        fields = appendOnFields(fields, 'authorEmail');

      data = await findSingle(query, posts, {
        _id: url
      });

      const author = await Accounts.findOne({subdomain, email: authorEmail}, 'name lastname');

      data.author = `${author.name} ${author.lastname}`;

      delete data.authorEmail;

      let fullUrl;
      if (data.postStatus === 'published')
        fullUrl = getFullUrl(url, urlID, data);

      if (data !== null) {
        if (fullUrl)
          return res.json({
            ...data,
            fullUrl
          });
        
        return res.json(data);
      }
    }
  }

  if (fields)
    fields = appendOnFields(fields, 'published,authorEmail');

  data = await findSingle(query, posts, conditions);

  const author = await Accounts.findOne({subdomain, email: authorEmail}, 'name lastname');

  data.author = `${author.name} ${author.lastname}`;

  delete data.authorEmail;

  if (data === null)
    res.status(404).json({
      message: `"${url}" does not exists`
    });
  else {
    let fullUrl;
    if (data.postStatus === 'published')
      fullUrl = getFullUrl(url, urlID, data);
    
    res.json({
      ...data,
      fullUrl
    });
  }
};