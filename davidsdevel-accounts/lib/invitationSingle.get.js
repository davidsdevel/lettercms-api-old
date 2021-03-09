module.exports = async function() {
  const {req, res, findSingle, Model} = this;

  const {id} = req.query;

  const data = await findSingle(this.req.query, this.Model, {_id: id});

  if (data === null)
    return res.status(404).json({message: 'Invitation not found'});

  return res.json(data);
}