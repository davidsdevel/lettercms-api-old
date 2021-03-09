const sdk = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');

const days = [
  'Sunday',
  'Monday',
  'Martes',
  'Miercoles',
  'Jueves',
  'Friday',
  'Saturday',
];

module.exports = async function() {
  const {
    req,
    res,
    Model
  }  = this;

  const {subdomain} = req;

  const {
    url,
    os,
    browser,
    country
  } = req.query;

  const conditions = {
    subdomain
  };

  const {posts} = sdk.useSubdomain(subdomain);

  const existsStats = await Model.Stats.exists({subdomain});

  if (!existsStats)
    return res.status(404).json({
      message: 'Stats does not exists'
    });

  const data = {
    os: {},
    countries: {},
    browsers: {},
    hours: {
      '1AM': 0,
      '2AM': 0,
      '3AM': 0,
      '4AM': 0,
      '5AM': 0,
      '6AM': 0,
      '7AM': 0,
      '8AM': 0,
      '9AM': 0,
      '10AM': 0,
      '11AM': 0,
      '12M': 0,
      '1PM': 0,
      '2PM': 0,
      '3PM': 0,
      '4PM': 0,
      '5PM': 0,
      '6PM': 0,
      '7PM': 0,
      '8PM': 0,
      '9PM': 0,
      '10PM': 0,
      '11PM': 0,
      '12AM': 0,
    },
    days: {
      Sunday: 0,
      Monday: 0,
      Martes: 0,
      Miercoles: 0,
      Jueves: 0,
      Friday: 0,
      Saturday: 0
    },
    dates: {},
    views: {}
  };

  const dateNow = Date.now();
  const limit = dateNow - (1000 * 60 * 60 * 24 * 30);

  for (let i = 29; i >= 0; i -= 1) {
    const time = new Date(dateNow - (i * 1000 * 60 * 60 * 24));
    const month = time.getMonth() + 1;
    const date = time.getDate();

    const path = `${date < 10 ? `0${date}` : date}-${month < 10 ? `0${month}` : month}`;

    data.dates[path] = 0;
  }

  if (os)
    conditions.os = new RegExp(os, 'i');

  if (browser)
    conditions.browser = new RegExp(browser, 'i');

  if (country)
    conditions.country = new RegExp(country, 'i');

  if (url)
    conditions.url = url;

  data.general = await Model.Stats.findOne({subdomain});
  data.total = await Model.Views.estimatedDocumentCount(conditions);

  const views = await Model.Views.find(conditions);
  
  const weekDate = new Date(dateNow - (1000 * 60 * 60 * 24 * 7));

  const week = new Date(`${weekDate.getFullYear()}-${weekDate.getMonth() + 1}-${weekDate.getDate()}`)

  views.forEach(e => {

    if (e.time > week) {
      const growth = data.growth || 0;

      data.growth = growth + 1;
    }

    let hour = e.time.getHours();

    if (hour < 12) {
      hour = `${hour}AM`;
    } else if (hour === 12) {
      hour = `${hour}M`;
    } else if (hour > 12) {
      hour = `${hour - 12}PM`;
    } else if (hour === 0) {
      hour = '12AM';
    }
    data.hours[hour] = data.hours[hour] + 1;

    const day = e.time.getDay();
    data.days[days[day]] = data.days[days[day]] + 1;

    let date = e.time.getDate();
    let month = e.time.getMonth() + 1;
    const dateMonth = `${date < 10 ? '0' + date : date}-${month < 10 ? '0' + month : month}`;

    const dateValue = data.dates[dateMonth] || 0;
    data.dates[dateMonth] = dateValue + 1;


    const osValue = data.os[e.os] || 0;
    data.os[e.os] = osValue + 1;

    const countryValue = data.countries[e.country] || 0;
    data.countries[e.country] = countryValue + 1;

    const BrowserValue = data.browsers[e.browser] || 0;
    data.browsers[e.browser] = BrowserValue + 1;

    const urlsValue = data.views[e.url] || 0;
    data.views[e.url] = urlsValue + 1;
  });

  res.json(data);
}