module.exports = async function() {
  const {req, res, Model, find} = this;

  const {
    status
  } = req.query;
  const {subdomain} = req;

  const condition = {
    subdomain
  };

  const users = await find(req.query, Model, condition);

  res.json(users);
}