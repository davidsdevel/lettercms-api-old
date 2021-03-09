module.exports = async function() {
  const {req, res, Model} = this;

  const {subdomain} = req;

  const data = await Model.create({...req.body, subdomain});

  res.json({
    message: 'OK',
    data
  });
}