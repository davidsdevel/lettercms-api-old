const {pages} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {req, res, find} = this;

  const {subdomain} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  if (status)
    condition.pageStatus = status;

  const pages = await find(req.query, pages, condition);

  res.json(pages);
}
