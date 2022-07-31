//Migrar posts

/**
 * Posts.find({authorEmail: {$exists: true}}, 'authorEmail');
 *
 *
 *
 */

 module.exports = async function() {
  //Migrating postsSchema
  const r = await posts.find({authorEmail: {$exists: true}}, 'authorEmail', {lean: true});
  
  await Promise.allSettled(r.map(async e => {
    const {_id} = await Accounts.findOne({email: e.authorEmail});

    return posts.updateMany({authorEmail: e.authorEmail}, {author: _id, $unset: {authorEmail:1}});
  }));


  const r2 = await posts.find({authorEmail: {$exists: false}}, 'subdomain', {lean: true});
  await Promise.allSettled(r2.map(async e => {
    const {ownerEmail} = await blogs.findOne({subdomain: e.subdomain}, 'ownerEmail', {lean: true});
    const {_id} = await Accounts.findOne({email: ownerEmail}, '_id', {lean: true});

    return posts.updateMany({subdomain: e.subdomain, authorEmail: {$exists: false}}, {author: _id, $unset: {authorEmail:true}});
  }));


  
 };
 