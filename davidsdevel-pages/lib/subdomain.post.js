const {pages, usage} = require('@lettercms/models');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const id = await pages.createPage(subdomain, req.body);
  await usage.updateOne({subdomain}, {$inc: {pages: 1}});

  res.json({
    status: 'OK',
    id
  });
};
