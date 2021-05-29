module.exports = async function() {
  const {
    req: {subdomain, body},
    res,
    Model: {Invitations}
  } = this;

  const {_id} = await Invitations.create({
    ...body,
    subdomain
  });

  //TODO: Send Email

  res.json({
    id:_id,
    message: 'OK'
  })
}
