var g = require('ger');
var esm = new g.MemESM();
var ger = new g.GER(esm);
const jwt = require('jsonwebtoken');

const {Letter} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');
const admin = require('C:/Users/pc/Documents/Proyectos/letterCMS/sdk-admin');

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
  const token = jwt.sign({subdomain}, 'davidsdevel');

  const sdk = new Letter(token);

  //Create Blog
  const blog = await Model.create(req.body);

  //Initialize Blog Stats
  await admin.createStat(subdomain);

  //Link subdomain to account 
  await admin.updateAccountSubdomain(ownerEmail, subdomain);

  await ger.initialize_namespace(subdomain);

  //Create Example Page and Post
  //const pageID = await pages.create();
  const {id} = await sdk.posts.create({
    title: 'Example Post',
    description: 'This is a description example',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    authorEmail: ownerEmail
  });

  //Make Public
  await sdk.posts.publish(id);

  return res.json({
    id: blog._id,
    message: 'OK'
  });
}