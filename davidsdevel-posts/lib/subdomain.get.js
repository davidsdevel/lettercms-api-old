const {Letter} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');
const jwt = require('jsonwebtoken');

const ORIGIN = 'http://localhost:3000';

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
    find,
    Model
  } = this;

  const {subdomain} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  const token = jwt.sign({subdomain: subdomain}, process.env.JWT_AUTH);
  const sdk = new Letter(token);
  const {url: urlID} = await sdk.blogs.single(['url']);
  console.log(urlID)

  if (status)
    condition.postStatus = status;

  if (req.query.fields)
    req.query.fields += ',published';

  const posts = await find({...req.query, posts:true}, Model, condition);

  posts.data = posts.data.map(e => {
    console.log(e)
    let fullUrl;

    if (e.postStatus === 'published')
      fullUrl = getFullUrl(e.url, urlID, e);

    return {
      ...e,
      fullUrl
    }
  });
  
  if (req.get('origin') === ORIGIN)
    posts.recommended = await Model.findOne(condition, null, {views: 'asc'});

  res.json(posts);
}