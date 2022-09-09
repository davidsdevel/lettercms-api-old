const {pages: pagesModel} = require('@lettercms/models')(['pages']);
const {find} = require('@lettercms/utils/lib/findHelpers/pages');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain, path} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  if (status)
    condition.pageStatus = status;

  const pages = await find(pagesModel, condition, req.query);

  res.json(pages);
};
