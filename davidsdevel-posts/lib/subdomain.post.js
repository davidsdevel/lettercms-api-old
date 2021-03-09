module.exports = async function() {
  const {req, res, Model} = this;

  const {subdomain} = req;
  const {status} = req.query;

  const data = await Model.createPost(subdomain, req.body);

  res.json({
    message: 'OK',
    data
  });
}