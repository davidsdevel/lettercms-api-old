const {socials} = require('@lettercms/models')(['facebook', 'instagram']);
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

  const {type, accessToken, pageID, subdomain} = req.body;

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
          pageId: pageID,
          token: longLive
        };

      const existsFB = await socials.Facebook.exists({subdomain}); 

      if (existsFB)
        await socials.Facebook.updateOne({subdomain}, {token: longLive});
      else
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
        token: longLive
      };

      const existsIG = await socials.Instagram.exists({subdomain}); 

      if (existsIG)
        await socials.Instagram.updateOne({subdomain}, {token: longLive});
      else
        await socials.Instagram.create(account);
    }

    res.json({
      status: 'OK',
      ...account
    });
  }
};
