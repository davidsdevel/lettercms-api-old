const {posts, pages} = require('@lettercms/models')(['pages', 'posts']);
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

  if (body.url) {
    const existsPage = await pages.exists({subdomain, url: req.body.url});

    if (existsPage)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A page with same URL already exists'
      });

    const existsPost = await posts.exists({subdomain, url: req.body.url, postStatus: 'published'});

    if (existsPost)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A post with same URL already exists'
      });
  }

  if (body.content)
    body.text = body.content.split('<').map(e => e.split('>')[1]).join('');

  const date = new Date();

  const newData = {
    ...body,
    updated: date
  }

  const {_id: postID, url: _url, postStatus} = await posts.findOneAndUpdate(updateCondition, newData, {select: '_id url postStatus'});


  if (postStatus === 'published') {
    fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        path: `/_blogs/${subdomain}/${_url}` 
      })
    });
  }

  res.json({
    status: 'OK',
    id: postID
  });
};