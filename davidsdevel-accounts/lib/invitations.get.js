module.exports = async function() {
  const {
    req,
    res,
    Model
  } = this;

  const {
    subdomain
  } = req;

  const data = await this.find(this.req.query, this.Model.Invitations, {subdomain});

  res.json(data)
}
