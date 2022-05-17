const {socials} = require('@lettercms/models');
const {Facebook, Instagram} = require('./social');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const {feeds, message, images} = req.body;

  const hasIg = feeds.indexOf('instagram') > -1;

  if (hasIg && !images && images.length !== 1) 
    return res.json({
      message: 'Instagram must have (1) image'
    });


  if (feeds.indexOf('facebook') > -1) {
    const {token, pageId} = await socials.Facebook.findOne({
      subdomain
    }, 'pageId token');

    const fb = new Facebook(pageId, token);

    await fb.publishPost(message, req.body);
  }

  if (hasIg) {
    const {token, userId} = await socials.Instagram.findOne({
      subdomain
    }, 'userId token');

    const ig = new Instagram(userId, token);

    await ig.publishPost(message, images[0]);
  }
};