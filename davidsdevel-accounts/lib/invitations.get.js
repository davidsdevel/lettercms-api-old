module.exports = async function() {
  const {
    req: {subdomain, query},
    res,
    Model: {Invitations},
    find
  } = this;

  const data = await find(query, Invitations, {subdomain});

  res.json(data)
}
