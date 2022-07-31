const {pages: pagesModel} = require('@lettercms/models')(['pages']);

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

  const draft = await pagesModel.countDocuments({subdomain, pageStatus: 'draft'});
  const published = await pagesModel.countDocuments({subdomain, pageStatus: 'published'});

  pages.total = {
    draft,
    published,
    all: draft + published
  };

  res.json(pages);
};
