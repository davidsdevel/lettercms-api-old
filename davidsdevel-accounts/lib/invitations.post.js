module.exports = async function() {
  const {
    req,
    res,
    Model
  } = this;

  const {subdomain} = req;

  const {_id} = await Model.Invitations.create({
    ...req.body,
    subdomain
  });

  //TODO: Send Email

  res.json({
    id:_id,
    message: 'OK'
  })
}