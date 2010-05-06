const {exchangeToken, api} = require('./social/base');

/**
 *
 * Queries
 * - fields
 * - include
 * - exclude
 * 
 *
 *
 */

module.exports = async function() {
  const {req, res, Model} = this;

  const {type, accessToken, id} = req.body;
  const {subdomain} = req;

  if (type === 'instagram' || type === 'facebook') {
    const longLive = await exchangeToken(accessToken);

    if (type === 'facebook') {

      const {name, username, cover} = await api(`/${id}`, {
        access_token: longLive,
        fields: 'name,username,cover'
      });

      await Model.Facebook.create({
        subdomain,
        pageId: id,
        token: longLive,
        name,
        username,
        cover: cover.source,
        picture: `https://graph.facebook.com/${id}/picture`
      });
    }

    if (type === 'instagram') {
      const {instagram_business_account} = await api(`/${id}`, {
        access_token: longLive,
        fields: 'instagram_business_account'
      });

      const {name, profile_picture_url, username} = await api(`/${instagram_business_account.id}`, {
        access_token: longLive,
        fields: 'name,profile_picture_url,username'
      });

      await Model.Instagram.create({
        userId: id,
        subdomain,
        token: longLive,
        name,
        username,
        picture: profile_picture_url
      });
    }

    res.json({
      status: 'OK'
    });
  }
}
