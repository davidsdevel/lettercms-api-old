const {stats, blogs, accounts, posts, usage, payment} = require('@lettercms/models');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {ownerEmail, subdomain} = req.body;

  const existsBlog = await blogs.exists({stats});
  if (existsBlog)
    return res.status(400).json({
      status: 'already-exists',
      message:'Blog already exists'
    });

  //Create Blog
  const blog = await blogs.create(req.body);

  //Initialize Blog Data
  await stats.Stats.create({subdomain});
  await usage.create({subdomain});
  await payment.Payment.create({subdomain});

  //Link subdomain to account 
  await accounts.Accounts.updateOne({email: ownerEmail}, {subdomain});

  //Create Example Page and Post
  //const pageID = await pages.create();

  const id = await posts.createPost(subdomain, {
    title: 'Yay! My firts post',
    description: 'You can use this description to get conversions',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    authorEmail: ownerEmail
  });

  //Make Public
  await posts.publishPost({id}, req.body);

  return res.json({
    id: blog._id,
    status: 'OK'
  });
};