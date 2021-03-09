module.exports = async function() {
  const {req, res, Model} = this;

  const {url} = req.query;
  const {subdomain} = req;

  await Model.deleteOne({url, subdomain});

  res.json({
    message: 'OK'
  });
}
