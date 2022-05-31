const {posts} = require('@lettercms/models');
const {sendMail} = require('@lettercms/utils');

module.exports = async function() {
  const {
    req: {
      body,
      subdomain
    },
    res
  } = this;

  const id = await posts.createPost(subdomain, body);

  //TODO send bulk mail when post
  //TODO send firebase messaging notification when post

  res.json({
    status: 'OK',
    id
  });
};