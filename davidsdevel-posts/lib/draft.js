const {posts, users: {Ratings}} = require('@lettercms/models')(['posts', 'ratings']);
const {isValidObjectId} = require('mongoose');
const brain = require('../../brain');
const fetch = require('node-fetch');

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

  const {_id: postID, url: _url, postStatus} = await posts.findOneAndUpdate(updateCondition, {postStatus: 'draft'}, {select: '_id url postStatus'});

  if (postStatus === 'draft')
    return res.status(400).json({
      status: 'posts/post-already-draft'
    });

  Ratings.deleteMany({post: postID});
  
  fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
    method: 'POST',
    body: JSON.stringify({
      path: `/_blogs/${subdomain}/${_url}` 
    })
  });
  fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
    method: 'POST',
    body: JSON.stringify({
      path: `/_blogs/${subdomain}` 
    })
  });

  res.json({
    status: 'OK',
    id: postID
  });
};