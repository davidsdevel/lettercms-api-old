const {users} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const data = await users.create({...req.body, subdomain});

  res.json({
    status: 'OK',
    data
  });
}