module.exports = async function() {
  const {req, res, Model} = this;

  const {subdomain} = req;

  const id = await Model.createPage(subdomain, req.body);

  res.json({
    message: 'OK',
    id
  });
}
