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

  const {include, exclude, fields} = req.query;
  const {subdomain} = req;

  const socialIncludes = include ? include.split(/\s*,\s*/g) : [];
  const socialExcludes = exclude ? exclude.split(/\s*,\s*/g) : [];

  const sendAll = socialIncludes !== null && socialExcludes !== null;

  const socials = {};
  const parsedFields = fields ? fields.replace(/\s*,\s*/g, ' ') : [];

  if (sendAll || socialIncludes.indexOf('facebook') > -1) {

    const fbData = await Model.Facebook.findOne({
      subdomain
    }, null, parsedFields);

    socials.facebook = fbData;
  }

  if (sendAll || socialIncludes.indexOf('instagram') > -1) {
    const igData = await Model.Instagram.findOne({
      subdomain
    }, null, parsedFields);

    socials.instagram = igData;
  }

  res.json(socials);
}