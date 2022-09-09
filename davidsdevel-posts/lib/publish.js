const {posts, pages, users: {Ratings, Users}, blogs, socials: {Facebook}} = require('@lettercms/models')(['facebook', 'pages', 'posts', 'ratings', 'users', 'blogs']);
const {isValidObjectId} = require('mongoose');
const brain = require('../../brain');
const FB = require('../../davidsdevel-socials/lib/social/Facebook');
const revalidate = require('@lettercms/utils/lib/revalidate');

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

    const existsPost = await posts.exists({subdomain, url: req.body.url});

    if (existsPost)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A post with same URL already exists'
      });

    const existsPublishedPost = await posts.exists({...updateCondition, postStatus: 'published'});
    if (existsPublishedPost)
      return res.status(400).json({
        status: 'posts/already-published',
        message: 'Post already published'
      });
  }

  if (body.content)
    body.text = body.content.split('<').map(e => e.split('>')[1]).join('');

  const date = new Date();

  const newData = {
    ...body,
    updated: date,
    published: date,
    postStatus: 'published'
  };

  const {tags, _id: postID, url: _url, description} = await posts.findOneAndUpdate(updateCondition, newData, {select: 'description _id tags url'});

  /*Facebook.findOne({subdomain}, 'pageId token').then(({pageId, token}) => {
    const fb = new FB(pageId, token);

    fb.publishPost(description, {
      link: `https://${subdomain}.lettercms.vercel.app/${_url}`
    });
  });*/
  const {mainUrl} = await blogs.find({subdomain}, 'mainUrl', {lean: true});

  revalidate(subdomain, mainUrl);

  Users.find({subdomain}, '_id mlModel')
    .then(users => {
      users.map(({_id, mlModel}) => {
        let rating = 0;

        if (mlModel) {
          const parsedTags = {};

          tags.forEach(e => parsedTags[e] = 1);
              
          const cross = new brain.CrossValidate(brain.NeuralNetwork);

          const net = cross.fromJSON(JSON.parse(mlModel));

          rating = net.run(parsedTags);
        }

        return Ratings.create({
          userID: _id,
          post: postID,
          subdomain,
          rating
        });
      });
  });

  res.json({
    status: 'OK',
    id: postID
  });
};