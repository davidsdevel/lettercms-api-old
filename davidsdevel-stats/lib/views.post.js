const {stats} = require('@lettercms/models');
const parser = require("ua-parser-js");
const geoip = require('geoip-lite');
const countries = require("i18n-iso-countries");

module.exports = async function() {
  const {
    req,
    res,
    Model
  }  = this;

  const {subdomain} = req;

  const {
    url
  } = req.body;

  const ua = req.headers["user-agent"];
  const {browser, os, device} = parser(ua);
  const look = geoip.lookup(req.ip)

  const countryName = look ? countries.getName(look.country, 'en') : 'Unknown';

  const existsPost = await posts.exists({url, subdomain});

    if (!existsPost)
      return res.status(404).json({
        status: 'not-found'
      });
      
  await posts.updateOne({url, subdomain}, {$inc: {views: 1}});

  await posts.Stats.updateOne({subdomain}, {$inc: {totalViews: 1}});

  await posts.Views.create({
    subdomain,
    country: countryName,
    os: os.name ||'Unknown',
    browser: browser.name ||'Unknown',
    url,
    referer: ''
  });

  res.json({
    status: 'OK'
  });
}
