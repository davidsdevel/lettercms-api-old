const {isValidObjectId} = require('mongoose');
const {Letter} = require('@lettercms/sdk');
const jwt = require('jsonwebtoken');

const getFullUrl = (url, urlID, data) => {
  if (urlID == '1')
    return `/${url}`;
  if (urlID == '2')
    return `/${data.category}/${url}`;

  const year = data.published.getFullYear();
  const month = data.published.getMonth() + 1;

  if (urlID == '3')
    return `/${year}/${month}/${url}`;

  const date = data.published.getDate();

  return `/${year}/${month}/${date}/${url}`;
}

module.exports = async function() {
  const {req, res, findSingle, Model} = this;

  const {subdomain} = req;
  const {
    url,
    category,
    day,
    month,
    year
  } = req.query;

  const conditions = {
    subdomain,
    url
  };

  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);
  const sdk = new Letter(token);
  const {url: urlID} = await sdk.blogs.single(['url']);

  if (category)
    conditions.category = category;
  if (day) {
    conditions.$where = `this.published.getDate() === ${day}`;
  }
  if (month) {
    let str = `this.published.getMonth() === ${month - 1}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }
  if (year) {
    let str = `this.published.getFullYear() === ${year}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }

  let data;

  if (!category && !day && !month && !year) {
    const isId = /[a-z,0-9]{12}/i.test(url) || /[a-z,0-9]{24}/i.test(url);

    if (isId) {
      data = await findSingle(req.query, Model, {
        _id: url
      });

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

  if (req.query.fields) {
    const fields = req.query.fields.split(',');

    if (fields.indexOf('fullUrl') >= 0 && fields.indexOf('published') < 0)
      fields.push('published');
    
    req.query.fields = fields.join(',');
  }

  data = await findSingle(req.query, Model, conditions);

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
}