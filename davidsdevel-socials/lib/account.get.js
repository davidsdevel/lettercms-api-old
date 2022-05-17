const {socials: socialModel} = require('@lettercms/models');

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

  if (sendAll || socialIncludes.indexOf('facebook') > -1) {

    const fbData = await socialModel.Facebook.findOne({
      subdomain
    }, parsedFields);

    socials.facebook = fbData;
  }

  if (sendAll || socialIncludes.indexOf('instagram') > -1) {
    const igData = await socialModel.Instagram.findOne({
      subdomain
    }, parsedFields);

    socials.instagram = igData;
  }

  res.json(socials);
};