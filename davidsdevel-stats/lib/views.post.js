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

  await Model.Stats.updateOne({subdomain}, {$inc: {totalViews: 1}});
  
  await Model.Views.create({
    subdomain,
    country: countryName,
    os: os.name ||'Unknown',
    browser: browser.name ||'Unknown',
    url,
    referer: ''
  });

  res.json({
    message: 'OK'
  });
}
