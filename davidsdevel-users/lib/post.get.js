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
  const {id, postID} = req.query;

  const select = req.query.fields ? req.query.fields.split(',').join(' ') : null;
  
  const {url: urlID} = await blogs.findOne({subdomain}, 'url');

  const condition = isValidObjectId(postID) ? {_id: postID} : {subdomain, url: postID};

  const existsPost = await postModel.exists(condition);

  if (!existsPost)
    return res.status(404).json({
      status: 'not-found',
      message: 'Post not found'
    })

  let recommended = null;

  const {tags, _id} = await postModel.findOne(condition, 'tags');

  const tagsMapped = tags.map(e => ({tags: {$in: e}}));
  
  const similars = await postModel.find({
    subdomain,
    $nor:[{_id}],
    $or: tagsMapped,
    postStatus: 'published'
  },
  'tags',
  {
    lean: true
  });

  let ordered = similars.map(e => {
    let matches = 0;
    e.tags.forEach(t => {
      if (tags.includes(t))
        matches++;
    });
    return {
      matches,
      _id: e._id
    }
  }).sort((a,b) => a.matches > b.matches ? -1 : +1);

  if (ordered.length < 1) {
    ordered = await postModel.find({_id: {$ne: _id}, subdomain, postStatus: 'published'}, '_id', {lean: true, sort: {published: -1}, limit: 2});
  } else if (ordered.length < 2) {
    ordered[1] = await postModel.findOne({_id: {$ne: _id}, subdomain, postStatus: 'published'}, '_id', {lean: true, sort: {published: -1}});   
  }

  const similar = await postModel.findOne({_id: ordered[0]._id}, select, {lean: true});
  
  if (id.includes('no-user'))
    recommended = await postModel.findOne({_id: ordered[1]._id}, select, {lean: true});
  else {

    const rated = await Ratings.findOne({
      subdomain,
      $and: [
        {post: {$ne: _id}},
        {post: {$ne: similar._id}}
      ]
    },
    'post'
    , {
      populate: {
        path: 'post',
        select
      },
      sort: {
        viewed: 1,
        rating: -1
      },
      lean: true
    });

    recommended = rated.post;
  }

  if (req.query.fields?.includes('url')) {
    similar.fullUrl = getFullUrl(similar.url, urlID, similar);
    recommended.fullUrl = getFullUrl(recommended.url, urlID, recommended);
  }

  res.json({
    similar,
    recommended
  });
};