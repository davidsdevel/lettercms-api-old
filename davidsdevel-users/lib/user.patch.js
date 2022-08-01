const {users: {Users}} = require('@lettercms/models')(['users']);

module.exports = async function() {
  const {req, res} = this;

  const {id} = req.query;
  const {subdomain} = req;

  if (req.body.email)
    req.bosy.subscriptionTime = new Date();

  await Users.updateOne({_id: id}, req.body);

  res.json({
    status: 'OK'
  });
};
