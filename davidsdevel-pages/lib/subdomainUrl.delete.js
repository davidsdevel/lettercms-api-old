const {pages, usage} = require('@lettercms/models')(['usage', 'pages']);
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  let deleteCondition = {};

  if (isId)
    deleteCondition._id = url;
  else {
    deleteCondition.url = url;
    deleteCondition.subdomain = subdomain;
  }

  await pages.deleteOne(deleteCondition);
  await usage.updateOne({subdomain}, {$inc: {pages: -1}});

  res.json({
    status: 'OK'
  });
};
