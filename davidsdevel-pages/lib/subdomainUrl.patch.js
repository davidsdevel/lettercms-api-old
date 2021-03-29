const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res, Model} = this;

  const {url} = req.query;
  const {action} = req.body;
  const {subdomain} = req;

  const isId = isValidObjectId(url);
  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  let data;
  let id;

  delete req.body.action;

  switch(action) {
    case 'publish':
      data = await Model.publishPage(updateCondition, req.body);
      break;
    case 'draft':
      data = await Model.draftPage(updateCondition, req.body);
      break;
    case 'update':
      data = await Model.updatePage(updateCondition, req.body);
      break;
    default:
      return res.status(400).json({
        message: `Unknow Action "${action}"`
      });
  }

  if (data.exists)
    return res.json({
      message: 'Url Exists'
    });

  res.json({
    message: 'OK',
    data
  });
}
