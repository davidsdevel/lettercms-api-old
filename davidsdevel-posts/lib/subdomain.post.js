const {posts} = require('@lettercms/models');

module.exports = async function() {
  const {
    req: {
      body,
      subdomain
    },
    res
  } = this;

  const id = await posts.createPost(subdomain, body);

  res.json({
    status: 'OK',
    id
  });
};