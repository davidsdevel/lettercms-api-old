module.exports = async function() {
  const {req, res, Model, find} = this;

  const {subdomain} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  if (status)
    condition.pageStatus = status;

  const pages = await find(req.query, Model, condition);

  res.json(pages);
}
