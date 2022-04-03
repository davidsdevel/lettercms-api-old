const {pages} = require('@lettercms/models');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const id = await pages.createPage(subdomain, req.body);

  res.json({
    status: 'OK',
    id
  });
}
