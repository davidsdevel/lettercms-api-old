const {stats, posts} = require('@lettercms/models');
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
      headers,
      header,
      ip
    },
    res
  }  = this;

  console.log(headers)
  console.log(header)
  console.log(ip)

  const ipDir = headers['X-Forwarded-For'] || headers['REMOTE_ADDR'] || ip;
  
  const ua = headers['user-agent'];
  const {browser, os} = parser(ua);
  const look = geoip.lookup(ipDir);

  const countryName = look ? countries.getName(look.country, 'en') : 'Unknown';

  const existsPost = await posts.exists({url, subdomain});

  if (!existsPost && url !== '/')
    return res.status(404).json({
      status: 'not-found'
    });

  if (url !== '/')    
    await posts.updateOne({url, subdomain}, {$inc: {views: 1}});

  await stats.Stats.updateOne({subdomain}, {$inc: {totalViews: 1}});

  await stats.Views.create({
    subdomain,
    country: countryName,
    os: os.name ||'Unknown',
    browser: browser.name ||'Unknown',
    url,
    referrer
  });

  res.json({
    status: 'OK'
  });
};
