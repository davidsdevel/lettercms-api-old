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
        id,
        token: longLive,
        name,
        username,
        cover,
        picture: `https://graph.facebook.com/${id}/picture`
      });
    }

    if (type === 'instagram') {
      const {name, profile_picture_url, username} = await api(`/${id}`, {
        fields: 'name,profile_picture_url,username'
      });

      await Model.Instagram.create({
        subdomain,
        token: longLive,
        name,
        username,
        picture: profile_picture_url
      });
    }

    res.json({
      message: 'OK'
    });
  }
}
