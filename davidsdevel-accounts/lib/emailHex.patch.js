const {accounts, posts, blogs} = require('@lettercms/models')(['accounts', 'posts', 'blogs']);
const revalidate = require('@lettercms/utils/lib/revalidate');
const {getFullUrl} = require('@lettercms/utils/lib/posts');
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {
    isAdmin,
    subdomain
  } = req;

  if (req.body.subdomain && !isAdmin)
    return res.status(403).json({
      message: 'Cannot change subdomain'
    });

  const {
    emailHex
  } = req.query;

  let condition = {};

  const isId = isValidObjectId(emailHex);

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, 'hex').toString('utf-8');

  const account = await accounts.Accounts.findOneAndUpdate(condition, req.body);

  Promise.all([
    posts.find({author: account._id, views: {$gt: 0}, postStatus: 'published'}, 'url category published', {lean: true}),
    blogs.find({subdomain}, 'mainUrl url', {lean: true})
  ])
  .then(([paths, blog]) => {
    paths.forEach(e => {
      const url = blog.mainUrl + getFullUrl(e, blog.url);

      revalidate(subdomain, url);
    });
  });

  res.json({
    status: 'OK'
  });
};
