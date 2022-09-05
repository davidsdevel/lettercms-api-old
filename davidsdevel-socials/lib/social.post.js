const {socials, usage} = require('@lettercms/models')(['facebook', 'instagram', 'usage']);
const {schedule} = require('@lettercms/utils');
const {Facebook, Instagram} = require('./social');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;
  const {social} = req.query;

  const {feed, message, images} = req.body;

  const hasIg = social === 'instagram';

  if (hasIg && !images) 
    return res.json({
      status: 'social/instagram-error',
      message: 'Instagram must have at least 1 image'
    });


  if (social === 'facebook') {
    const {token, pageId} = await socials.Facebook.findOne({
      subdomain
    }, 'pageId token');

    const fb = new Facebook(pageId, token);

    try {
      let publishRes = await fb.publishPost(message, req.body);

    if (req.body.schedule)
      await usage.updateOne({subdomain}, {$inc: {socialSchedule: 1}});

    return res.json({
      status: 'OK',
      id: publishRes.id
    });

    } catch(err) {
      return res.status(500).json({
        status: 'server-error',
        message: err
      });
    }
  }

  if (hasIg) {
    const {token, userId} = await socials.Instagram.findOne({
      subdomain
    }, null, 'userId token');

    const ig = new Instagram(userId, token);

    if (req.body.schedule) {
      await schedule(req.body.schedule, {
        method: 'POST',
        url: 'https://lettercms-api-staging.herokuapp.com/api/social/instagram',
        headers: {
          Authorization: jwt.sign({subdomain}, process.env.JWT_AUTH),
          'Content-Type': 'application/json' 
        },
        body: {
          ...req.body,
          schedule: undefined
        }
      });

      await usage.updateOne({subdomain}, {$inc: {socialSchedule: 1}});
    }
    else
      await ig.publishPost(message, images);
  }

  res.json({status: 'OK'});
};