const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res, Model} = this;

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
    const exists = await Model.exists(updateCondition);

    if (!exists)
      return res.json({
        status: 'not-found'
      });
      
    await Model.updateOne(updateCondition, {$inc: {views: 1}});

    return res.json({
      status: 'OK'
    });
  }

  let data;
  let id;

  delete req.body.action;

  console.log({...req.body, subdomain})

  switch(action) {
    case 'publish':
      data = await Model.publishPost({subdomain, ...updateCondition}, req.body);
      break;
    case 'draft':
      data = await Model.draftPost(updateCondition, req.body);
      break;
    case 'update':
      data = await Model.updatePost(updateCondition, req.body);
      break;
    default:
      return res.status(400).send({
        message: `Unknow Action "${action}"`
      });
  }

  if (data.exists)
    return res.json({
      message: 'Url Exists'
    });

  res.json({
    status: 'OK',
    data
  });
}