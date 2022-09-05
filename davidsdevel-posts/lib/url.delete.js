const {blogs, posts, users: {Ratings}} = require('@lettercms/models')(['posts', 'ratings', 'blogs']);
const {isValidObjectId} = require('mongoose');
const fetch = require('node-fetch');

const getFullUrl = (post, urlID) => {
  if (urlID == '1')
    return `/${post.url}`;

  if (urlID == '2')
    return `/${post.category}/${post.url}`;

  const year = post.published.getFullYear();
  const month = post.published.getMonth() + 1;

  if (urlID == '3')
    return `/${year}/${month}/${url}`;

  const date = post.published.getDate();

  return `/${year}/${month}/${date}/${post.url}`;
};

module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  const deleteCondition = {};

  if (isId)
    deleteCondition._id = url;
  else {
    deleteCondition.url = url;
    deleteCondition.subdomain = subdomain;
  }

  let post = deleteCondition._id;

  if (!deleteCondition._id) {
    const p = posts.findOne(deleteCondition, '_id', {lean: true});
    post = p._id;
  }
  const p = await posts.findOne(deleteCondition, 'url category published', {lean: true});

  await posts.deletePost(deleteCondition);
  await Ratings.deleteMany({subdomain, post});
  
  const {mainUrl, url: urlID} = await blogs.find({subdomain}, 'mainUrl url', {lean: true});

  
  fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: `/_blogs/${subdomain}${mainUrl + getFullUrl(p, urlID)}` 
    })
  });

  fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: `/_blogs/${subdomain}${mainUrl}` 
    })
  });

  res.json({
    status: 'OK'
  });
};