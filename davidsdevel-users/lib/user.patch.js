const {users: {Users}} = require('@lettercms/models')(['users']);

module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  await Users.updateOne({url, subdomain}, req.body);

  res.json({
    status: 'OK'
  });
};
