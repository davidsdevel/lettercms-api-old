const {accounts, posts} = require('@lettercms/models')(['accounts', 'posts', 'users']);
const {isValidObjectId} = require('mongoose');
const fetch = require('node-fetch');

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

  const paths = await posts.find({author: account._id}, 'url', {lean: true});

  paths.forEach(({url}) => {
    fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/_blogs/${subdomain}/${url}` 
      })
    });
  });

  res.json({
    status: 'OK'
  });
};
