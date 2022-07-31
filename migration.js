const mongoose = require('mongoose');

//Migrar posts

/**
 * Posts.find({authorEmail: {$exists: true}}, 'authorEmail');
 *
 *
 *
 */

 module.exports = async function() {
   const m = await mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const {posts, users: {Users}, accounts: {Accounts}} = require('@lettercms/models')(m, ['posts', 'accounts', 'users']);


  //Migrating postsSchema
  const r = await posts.find({authorEmail: {$exists: true}}, 'authorEmail', {lean: true});
  
  const rr = await Promise.allSettled(r.map(async e => {
    const {_id} = await Accounts.findOne({email: e.authorEmail});

    return posts.updateMany({authorEmail: e.authorEmail}, {author: _id, $unset: {authorEmail:1}});
  }));

  console.log(rr)


  const r2 = await posts.find({authorEmail: {$exists: false}}, 'subdomain', {lean: true});
  const r2r = await Promise.allSettled(r2.map(async e => {
    const {ownerEmail} = await blogs.findOne({subdomain: e.subdomain}, 'ownerEmail', {lean: true});
    const {_id} = await Accounts.findOne({email: ownerEmail}, '_id', {lean: true});

    return posts.updateMany({subdomain: e.subdomain, authorEmail: {$exists: false}}, {author: _id, $unset: {authorEmail:true}});
  }));

  console.log(r2r);
 
  const u = Users.updateMany({}, {$unset: {email: 1}});

  console.log(u);
 };
 