const {accounts, posts, blogs} = require('@lettercms/models')(['accounts', 'posts', 'blogs']);
const {isValidObjectId} = require('mongoose');
const fetch = require('node-fetch');

const getFullUrl = (post, urlID) => {
  if (urlID == '1')
    return `/${post.url}`;

  if (urlID == '2')
    return `/${post.category}/${post.url}`;

  const year = post.published.getFullYear();
  const month = post.published.getMonth() + 1;

  if (urlID == '3')
    return `/${year}/${month}/${url}`;

  const date = post.published.getDate();

  return `/${year}/${month}/${date}/${post.url}`;
};

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

  const paths = await posts.find({author: account._id, views: {$gt: 0}, postStatus: 'published'}, 'url category published', {lean: true});
  const {mainUrl, url: urlID} = await blogs.find({subdomain}, 'mainUrl url', {lean: true});

  paths.forEach(e => {
    const url = mainUrl + getFullUrl(e, urlID);

    fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/_blogs/${subdomain}${url}` 
      })
    });
  });

  res.json({
    status: 'OK'
  });
};
