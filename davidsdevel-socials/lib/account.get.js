const {socials: socialModel} = require('@lettercms/models');
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

  const sendAll = socialIncludes !== null && socialExcludes !== null;

  const socials = {};
  const parsedFields = fields ? fields.replace(/\s*,\s*/g, ' ') : [];

  const hasIG = await socialModel.Instagram.exists({subdomain});
  const hasFB = await socialModel.Instagram.exists({subdomain});

  if ((sendAll || socialIncludes.indexOf('facebook') > -1) && hasFB) {

    const fbData = await socialModel.Facebook.findOne({
      subdomain
    }, parsedFields);

    socials.facebook = fbData;
  }

  if ((sendAll || socialIncludes.indexOf('instagram') > -1) && hasIG) {
    const igData = await socialModel.Instagram.findOne({
      subdomain
    }, parsedFields);

    const {token, userId} = igData;

    const {profile_picture_url} = await api(`/${userId}`, {
      access_token: token,
      fields: 'profile_picture_url'
    });

    igData.picture = profile_picture_url;

    socials.instagram = igData;
  }

  res.json(socials);
};