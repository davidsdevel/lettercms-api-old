const {socials: socialModel} = require('@lettercms/models')(['facebook', 'instagram']);
const {api} = require('./social/base');

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

  const {include, exclude, fields} = req.query;
  const {subdomain} = req;

  const socialIncludes = include ? include.split(/\s*,\s*/g) : [];
  const socialExcludes = exclude ? exclude.split(/\s*,\s*/g) : [];

  const sendAll = !include && !exclude;

  const socials = {};
  const parsedFields = fields ? fields.replace(/\s*,\s*/g, ' ') : [];

  const hasIG = await socialModel.Instagram.exists({subdomain});
  const hasFB = await socialModel.Facebook.exists({subdomain});

  if ((sendAll || socialIncludes.indexOf('facebook') > -1) && hasFB) {
    const {token, pageId} = await socialModel.Facebook.findOne({
      subdomain
    }, 'token pageId');

    const {cover, name, username} = await api(`/${pageId}`, {
      access_token: token,
      fields: 'name,username,cover'
    });

    socials.facebook  = {
      subdomain,
      pageId,
      token: token,
      name,
      username,
      cover: cover.source,
      picture: `https://graph.facebook.com/${pageId}/picture`
    };
  }

  if ((sendAll || socialIncludes.indexOf('instagram') > -1) && hasIG) {
    const {token, userId} = await socialModel.Instagram.findOne({
      subdomain
    }, 'token userId');

    const {name, profile_picture_url, username} = await api(`/${userId}`, {
      access_token: token,
      fields: 'name,profile_picture_url,username'
    });

    socials.instagram = {
      userId,
      subdomain,
      token,
      name,
      username,
      picture: profile_picture_url
    };
  }

  res.json(socials);
};