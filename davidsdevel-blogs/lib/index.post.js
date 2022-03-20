const jwt = require('jsonwebtoken');

const {Letter} = require('@lettercms/sdk');
const admin = require('@lettercms/admin');

module.exports = async function() {
  const {
    Model,
    req,
    res
  } = this;

  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {ownerEmail, subdomain} = req.body;
  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);

  const sdk = new Letter(token);

  //Create Blog
  const blog = await Model.create(req.body);

  //Initialize Blog Stats
  await admin.createStat(subdomain);

  //Link subdomain to account 
  await admin.updateAccountSubdomain(ownerEmail, subdomain);

  //Create Example Page and Post
  //const pageID = await pages.create();
  const {id} = await sdk.posts.create({
    title: 'Yay! My firts post',
    description: 'You can use this description to get conversions',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    authorEmail: ownerEmail
  });

  //Make Public
  await sdk.posts.publish(id);

  return res.json({
    id: blog._id,
    status: 'OK'
  });
}