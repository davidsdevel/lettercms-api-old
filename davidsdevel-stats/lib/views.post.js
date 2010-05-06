const parser = require("ua-parser-js");
const geoip = require('geoip-lite');
const countries = require("i18n-iso-countries");
const jwt = require('jsonwebtoken');
const {Letter} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');

module.exports = async function() {
  const {
    req,
    res,
    Model
  }  = this;

  const {subdomain} = req;
  const token = jwt.sign({subdomain}, process.env.JWT_AUTH)
  const sdk = new Letter(token);

  const {
    url
  } = req.body;

  const ua = req.headers["user-agent"];
  const {browser, os, device} = parser(ua);
  const look = geoip.lookup(req.ip)

  const countryName = look ? countries.getName(look.country, 'en') : 'Unknown';

  const {status} = await sdk.createRequest(`/post/${url}`, 'PATCH', {
    action: 'set-view'
  });

  if (status === 'not-found')
    return res.status(404).json({
      status: 'not-found',
      message: `Post "${url}" does not exists`
    });

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
    status: 'OK'
  });
}
