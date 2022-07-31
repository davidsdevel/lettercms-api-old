const mongoose = require('mongoose');

//Migrar posts

/**
 * Posts.find({authorEmail: {$exists: true}}, 'authorEmail');
 *
 *
 *
 */

 (async function() {
   const m = await mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const {posts, users: {Users}, accounts: {Accounts}} = require('@lettercms/models')(m, ['posts', 'accounts', 'users']);


  await Users.syncIndexes();
  await Accounts.syncIndexes();
  //Migrating postsSchema
  const r = await posts.find({authorEmail: {$exists: true}}, 'authorEmail', {lean: true});
  
  const rr = await Promise.allSettled(r.map(async e => {
    const {_id} = await Accounts.findOne({email: e.authorEmail});

    return posts.updateMany({authorEmail: e.authorEmail}, {author: _id, authorEmail: null});
  }));

  const r2 = await posts.find({authorEmail: {$exists: false}}, 'subdomain', {lean: true});
  const r2r = await Promise.allSettled(r2.map(async e => {
    const {ownerEmail} = await blogs.findOne({subdomain: e.subdomain}, 'ownerEmail', {lean: true});
    const {_id} = await Accounts.findOne({email: ownerEmail}, '_id', {lean: true});

    return posts.updateMany({subdomain: e.subdomain, authorEmail: {$exists: false}}, {author: _id, authorEmail: null});
  }));

  const p3 = await posts.updateMany({author: {$exists: true}}, {authorEmail: null});
  console.log(p3)
 
  const u = await Users.updateMany({}, {$unset: {email: 1}});
  console.log(u);
 })();
 