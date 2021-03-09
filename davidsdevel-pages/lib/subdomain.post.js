module.exports = async function() {
  const {req, res, Model} = this;

  const {subdomain} = req;

  const data = await Model.createPage(subdomain, req.body);

  res.json({
    message: 'OK',
    data
  });
}