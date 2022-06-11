const {posts, blogs} = require('@lettercms/models');

const appendOnFields = (fields, field) => {
  const splittedFields = fields.split(',');
  if (splittedFields.indexOf(field) === -1) {
    splittedFields.push(field);
    return splittedFields.join(',');
  }
};

const getFullUrl = (url, urlID, data) => {
  const base = process.env.ENV === 'staging' ? `/${data.subdomain}`  : '';

  if (urlID == '1')
    return `${base}/${url}`;

  if (urlID == '2')
    return `${base}/${data.category}/${url}`;

  const year = data.published.getFullYear();
  const month = data.published.getMonth() + 1;

  if (urlID == '3')
    return `${base}/${year}/${month}/${url}`;

  const date = data.published.getDate();

  return `${base}/${year}/${month}/${date}/${url}`;
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
  if (query.fields)
    query.fields = appendOnFields(query.fields, 'subdomain');

  if (!category && !day && !month && !year) {
    const isId = /[a-z,0-9]{12}/i.test(url) || /[a-z,0-9]{24}/i.test(url);

    if (isId) {
      data = await findSingle(query, posts, {
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

  if (query.fields)  
    query.fields = appendOnFields(query.fields, 'published');

  data = await findSingle(query, posts, conditions);

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