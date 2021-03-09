var g = require('ger');
var esm = new g.MemESM();
var ger = new g.GER(esm);
const jwt = require('jsonwebtoken');

const {Letter} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');

module.exports = async function() {
  const {
    Model,
    req,
    res
  } = this;
  
  const {subdomain} = req;
  const {ownerEmail} = req.body;
  const token = jwt.sign({subdomain}, 'davidsdevel');

  const sdk = new Letter(token);

  //Create Blog
  await Model.create(req.body);

  //Initialize Blog Stats
  await sdk.stats.create();

  //Link subdomain to account 
  const {data: account} = await sdk.accounts.update(ownerEmail, {
    subdomain
  });

  await ger.initialize_namespace(subdomain);

  //Create Example Page and Post
  //const pageID = await pages.create();
  const {data} = await sdk.posts.create({
    title: 'Example Post',
    description: 'This is a description example',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    authorEmail: ownerEmail
  });

  //Make Public
  await sdk.posts.publish(data._id);

  return res.json({
    message: 'OK'
  });
}