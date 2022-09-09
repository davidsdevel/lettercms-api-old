const {users: {Users}} = require('@lettercms/models')(['users']);
const {findOne} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {req, res} = this;

  const {id} = req.query;
  const {subdomain} = req;

  const data = await findOne(Users, {_id: id}, req.query);

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
};