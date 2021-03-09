module.exports = async function() {
  const {req, res, Model} = this;

  const {url} = req.query;
  const {subdomain} = req;

  await Model.updateOne({url, subdomain}, req.body);

  res.json({
    message: 'OK',
    data
  });
}
