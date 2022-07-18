const {posts, accounts: {Accounts}} = require('@lettercms/models');
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
  const {email} = await Accounts.findById(account);

  const id = await posts.createPost(subdomain, {authorEmail: email, ...body});

  //TODO send bulk mail when post
  //TODO send firebase messaging notification when post

  res.json({
    status: 'OK',
    id
  });
};