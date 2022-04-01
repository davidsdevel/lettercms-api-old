const {users} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  await users.deleteOne({url, subdomain});

  res.json({
    status: 'OK'
  });
}
