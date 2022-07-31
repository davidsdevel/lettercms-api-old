const {users: {Users}} = require('@lettercms/models')(['users']);

module.exports = async function() {
  const {req, res, findSingle} = this;

  const {id} = req.query;
  const {subdomain} = req;

  const data = await findSingle({...req.query, subdomain}, Users, {
    _id: id
  });

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
};