const {posts} = require(process.cwd() + '/mongo');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;
  const {status} = req.query;

  const id = await posts.createPost(subdomain, req.body);

  res.json({
    status: 'OK',
    id
  });
}