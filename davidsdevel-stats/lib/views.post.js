const {stats, posts, blogs} = require('@lettercms/models')(['posts', 'blogs', 'views', 'stats']);
const parser = require('ua-parser-js');
const geoip = require('geoip-lite');
const countries = require('i18n-iso-countries');

module.exports = async function() {
  const {
    req: {
      subdomain,
      body: {
        url,
        referrer
      },
      headers
    },
    res
  }  = this;

  const ipDir = headers['x-forwarded-for'];
  
  const ua = headers['user-agent'];
  const {browser, os} = parser(ua);
  const look = geoip.lookup(ipDir);

  const countryName = look ? countries.getName(look.country, 'es') : 'Unknown';

  const {mainUrl} = await blogs.findOne({subdomain}, 'mainUrl', {lean: true});
  const existsPost = await posts.exists({url, subdomain});

  if (!existsPost && '/' + url !== mainUrl)
    return res.status(404).json({
      status: 'not-found'
    });

  if ('/' + url !== mainUrl)    
    await posts.updateOne({url, subdomain}, {$inc: {views: 1}});

  await stats.Stats.updateOne({subdomain}, {$inc: {totalViews: 1}});
  const viewData = {
    subdomain,
    country: countryName,
    os: os.name ||'Unknown',
    browser: browser.name ||'Unknown',
    url
  }
  if (referrer && referrer != 'undefined' && referrer != 'null')
    viewData.referrer = referrer;

  await stats.Views.create();

  res.json({
    status: 'OK'
  });
};
