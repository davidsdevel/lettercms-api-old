module.exports = async function() {
  const {
    req:{query},
    res,
    findSingle,
    Model: {Invitations}
  } = this;

  const {id} = query;

  const data = await findSingle(query, Invitations, {_id: id});

  if (data === null)
    return res.status(404).json({message: 'Invitation not found'});

  return res.json(data);
}