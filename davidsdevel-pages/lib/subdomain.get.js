const {pages: pagesModel} = require('@lettercms/models');

module.exports = async function() {
  const {req, res, find} = this;

  const {subdomain, path} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  if (status)
    condition.pageStatus = status;

  const pages = await find({
    ...req.query,
    path
  }, pagesModel, condition);

  res.json(pages);
};
