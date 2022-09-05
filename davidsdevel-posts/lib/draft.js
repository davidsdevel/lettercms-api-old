const {posts, users: {Ratings}, blogs} = require('@lettercms/models')(['posts', 'ratings', 'blogs']);
const {isValidObjectId} = require('mongoose');
const brain = require('../../brain');
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
  const {subdomain, body} = req;

  const isId = isValidObjectId(url);

  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  const {_id: postID, url: _url, postStatus, category, published, views} = await posts.findOneAndUpdate(updateCondition, {postStatus: 'draft'}, {select: '_id url postStatus category published views'});

  if (postStatus === 'draft')
    return res.status(400).json({
      status: 'posts/post-already-draft'
    });

  Ratings.deleteMany({post: postID});
  const {mainUrl, url: urlID} = await blogs.find({subdomain}, 'mainUrl url', {lean: true});

  if (views > 0)
    fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/_blogs/${subdomain}${mainUrl + getFullUrl({category, published,url: _url}, urlID)}` 
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
    status: 'OK',
    id: postID
  });
};