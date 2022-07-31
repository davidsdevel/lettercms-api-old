const {posts, accounts: {Accounts}} = require('@lettercms/models')(['posts', 'accounts']);
const {sendMail} = require('@lettercms/utils');

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

  //TODO send bulk mail when post
  //TODO send firebase messaging notification when post

  res.json({
    status: 'OK',
    id
  });
};