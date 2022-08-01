const {posts: postModel, blogs, users: {Users, Ratings}} = require('@lettercms/models')(['posts', 'blogs', 'users', 'ratings']);
const getFullUrl = require('./getFullUrl');
const {isValidObjectId} = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';
const ORIGIN = isDev ? 'http://localhost:3000' : 'https://lettercms-api-staging.herokuapp.com';

module.exports = async function() {
  const {
    req,
    res,
    find
  } = this;

  const {subdomain, path} = req;
  const {id} = req.query;
  
  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  const haveModel = isValidObjectId(id) ? await Users.exists({_id: id, hasRecommendations: true}) : false;
  
  let posts = null;

  if (req.query.fields)
    req.query.fields += ',published,postStatus';
  
  
  if (!haveModel || id === 'no-user') {
    const condition = {
      subdomain,
      postStatus: 'published'
    };
    
    posts = await find({...req.query, posts:true, path}, postModel, condition);
  } else {
    const select = req.query.fields ? req.query.fields.split(',').join(' ') : null;
    delete req.query.fields;

    posts = await find({
      ...req.query,
      path,
      populate: {
        path: 'post',
        select
      },
      lean: true,
      recommendation: true
    }, Ratings, {userID: id});

    posts.data = posts.data.map(e => e.post);

    console.log(posts)
  }

  posts.data = posts.data.map(e => {
    let fullUrl;

    if (e.postStatus === 'published')
      fullUrl = getFullUrl(e.url, urlID, e);

    return {
      ...e,
      fullUrl
    };
  });

  res.json(posts);
};