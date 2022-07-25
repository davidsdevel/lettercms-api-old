const {posts, users: {Users, Ratings}} = require('@lettercms/models');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const endpoint = process.env.NODE_ENV === 'production' ? 'https://lettercms-recommendation.herokuapp.com' : 'http://localhost:3008';

const parseTags = arr => {
  const tags = {};

  arr.forEach(e => tags[e] = 1);

  return tags;
}

module.exports = async function() {
  const {
    res,
    req: {
      query: {
        id
      },
      body: {
        url
      },
      subdomain
    }
  } = this;

  const existsUrl = await posts.exists({subdomain, url});

  if (!existsUrl)
    return res.json({
      status: 'not-found'
    });


  const {tags, _id} = await posts.findOne({subdomain, url}, 'tags');

  const views = parseTags(tags);
  const {postsView} = await Users.findOne({_id: id}, 'postsView', {lean: true});

  if (postsView < 5)
    await Users.updateOne({_id: id}, {views: [
      views,
      views,
      views,
      views,
      views,
    ], postsView: 5});
  else
    await Users.updateOne({_id: id}, {$push: {views}, $inc: {postsView: 1}});


  await Ratings.updateOne({post: _id}, {viewed: true});

  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);

  fetch(`${endpoint}/api/recommendation/${id}`, {
    method: 'POST',
    headers: {
      Authorization: token
    }
  })

  res.json({
    status: 'OK'
  });
};
