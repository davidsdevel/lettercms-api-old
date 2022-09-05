const {posts, users: {Ratings, Users}, socials: {Facebook}} = require('@lettercms/models')(['facebook', 'posts', 'ratings', 'users']);
const {isValidObjectId} = require('mongoose');
const brain = require('../../brain');

module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;
  const {action} = req.body;

  const isId = isValidObjectId(url);

  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  if (action === 'set-view') {
    const exists = await posts.exists(updateCondition);

    if (!exists)
      return res.json({
        status: 'not-found'
      });
      
    await posts.updateOne(updateCondition, {$inc: {views: 1}});

    return res.json({
      status: 'OK'
    });
  }

  let data;

  delete req.body.action;

  switch(action) {
    case 'publish':
      data = await posts.publishPost({subdomain, ...updateCondition}, req.body);
      break;
    case 'draft':
      data = await posts.draftPost(updateCondition, req.body);
      break;
    case 'update':
      data = await posts.updatePost(updateCondition, req.body);
      break;
    default:
      return res.status(400).send({
        message: `Unknow Action "${action}"`
      });
  }

  if (action === 'draft') {
    Ratings.deleteMany({post: data.id});
  }

  if (data.exists)
    return res.json({
      message: 'Url Exists'
    });

  if (action === 'publish' && !data.exists) {
    Facebook.findOne({subdomain}).then({
      subdomain
    });
    
    Users.find({subdomain}, '_id hasRecommendations mlModel')
      .then(users => {
        Promise.allSettled(
          users.map(({_id, hasRecommendations, mlModel}) => {
            let rating = 0;
            if (mlModel) {
              const parsedTags = {};

              data.tags.forEach(e => parsedTags[e] = 1);
              
              const cross = new brain.CrossValidate(brain.NeuralNetwork);

              const net = cross.fromJSON(JSON.parse(mlModel));

              rating = net.run(parsedTags);
            }

            return Ratings.create({
              userID: _id,
              post: data.id,
              subdomain,
              rating
            });
          })
        ).then(() => {
          delete data.tags;
        });
      });
  }

  res.json({
    status: 'OK',
    id: data.id
  });
};