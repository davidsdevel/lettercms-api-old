module.exports = async function() {
  const {req, res, findSingle, Model} = this;

  const {id} = req.query;
  const {subdomain} = req;

  const data = await findSingle({...req.query, subdomain}, Model, {
    _id: id
  });

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
}