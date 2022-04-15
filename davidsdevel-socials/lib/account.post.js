const {socials} = require('@lettercms/models');
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
  const {req, res} = this;

  const {type, accessToken, pageID} = req.body;
  const {subdomain} = req;
  let account;

  if (type === 'instagram' || type === 'facebook') {
    const longLive = await exchangeToken(accessToken);

    if (type === 'facebook') {

      const {name, username, cover} = await api(`/${pageID}`, {
        access_token: longLive,
        fields: 'name,username,cover'
      });

      account = {
        subdomain,
        pageId: id,
        token: longLive,
        name,
        username,
        cover: cover.source,
        picture: `https://graph.facebook.com/${pageID}/picture`
      }

      await socials.Facebook.create(account);
    }

    if (type === 'instagram') {
      const {instagram_business_account} = await api(`/${pageID}`, {
        access_token: longLive,
        fields: 'instagram_business_account'
      });

      const {id: userId, name, profile_picture_url, username} = await api(`/${instagram_business_account.id}`, {
        access_token: longLive,
        fields: 'name,profile_picture_url,username'
      });

      account = {
        userId,
        subdomain,
        token: longLive,
        name,
        username,
        picture: profile_picture_url
      }

      await socials.Instagram.create(account);
    }

    res.json({
      status: 'OK',
      ...account
    });
  }
}
