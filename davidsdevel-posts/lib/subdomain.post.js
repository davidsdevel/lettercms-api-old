const {posts} = require('@lettercms/models')(['posts']);

module.exports = async function() {
  const {
    req: {
      body,
      account,
      subdomain
    },
    res
  } = this;
  const id = await posts.createPost(subdomain, {author: account, ...body});

  res.json({
    status: 'OK',
    id
  });
};
