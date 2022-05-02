const {stats, posts} = require('@lettercms/models');

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
    res
  }  = this;

  const {subdomain} = req;

  const {
    url,
    os,
    browser,
    country,
    start,
    end,
    fields
  } = req.query;

  const conditions = {
    subdomain
  };

  const existsStats = await stats.Stats.exists({subdomain});

  if (!existsStats)
    return res.status(404).json({
      status: 'no-stats',
      message: 'Stats does not exists'
    });

  const hasOs = !fields || (fields.includes("os") && !fields.includes('most'));
  const hasCountries = !fields || fields.includes('countries');
  const hasBrowsers = !fields || fields.includes('browsers');
  const hasHours = !fields || fields.includes('hours');
  const hasDays = !fields || fields.includes('days');
  const hasDates = !fields || fields.includes('dates');
  const hasViews = !fields || fields.includes('views');
  const hasGeneral = !fields || fields.includes('general');
  const hasGrowth = !fields || fields.includes('growth');
  const hasMostCommented = !fields || fields.includes('mostCommented');
  const hasMostViewed = !fields || fields.includes('mostViewed');
  const hasTotal = !fields || fields.includes('total');

  let data = {};

  if (hasOs)
    data.os = {};
  if (hasCountries)
    data.countries = {};
  if (hasBrowsers)
    data.browsers = {};
  if (hasHours)
    data.hours = {
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
    };
  if (hasDays)
    data.days = {
      Sunday: 0,
      Monday: 0,
      Martes: 0,
      Miercoles: 0,
      Jueves: 0,
      Friday: 0,
      Saturday: 0
    };
  if (hasDates)
    data.dates = {};

  if (hasViews || hasMostViewed)
    data.views = {};


  const dateEnd = end ? new Date(end) : Date.now();
  let dateStart = new Date(start ? start : dateEnd - (1000 * 60 * 60 * 24 * 30));

  const diff = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);

  if (diff < 0)
    return res.json({
      code: 'invalid-date',
      message: 'End date must be greather than start date'
    });

  if (hasMostCommented) {
    const commentsRes = await posts.find({subdomain}, 'thumbnail title views comments url', {
      sort: {
        comments: -1
      },
      limit: 1,
      lean: true
    });

    data.mostCommented = commentsRes.data[0];
  }

  conditions.$where = `this.time > new Date("${dateStart.toISOString()}") && this.time < new Date("${new Date(new Number(dateEnd) + (1000 * 60 * 60 * 24)).toISOString()}")`;

  //Create Object Properties
  if (hasDates) {
    for (let i = Math.floor(diff); i >= 0; i -= 1) {
      const time = new Date(dateEnd - ((i - 1)* 1000 * 60 * 60 * 24));
      const month = time.getMonth() + 1;
      const date = time.getDate();

      const path = `${date < 10 ? `0${date}` : date}-${month < 10 ? `0${month}` : month}`;

      data.dates[path] = 0;
    }
  }

  if (os)
    conditions.os = new RegExp(os, 'i');

  if (browser)
    conditions.browser = new RegExp(browser, 'i');

  if (country)
    conditions.country = new RegExp(country, 'i');

  if (url)
    conditions.url = url;

  if (hasGeneral)
    data.general = await stats.Stats.findOne({subdomain});
  
  if (hasTotal)
    data.total = await stats.Views.estimatedDocumentCount(conditions);

  const views = await stats.Views.find(conditions);
  
  const weekDate = new Date(dateEnd - (1000 * 60 * 60 * 24 * 7));

  const week = new Date(`${weekDate.getFullYear()}-${weekDate.getMonth() + 1}-${weekDate.getDate()}`)

  views.forEach(async e => {
    if (hasGrowth) {
      if (e.time > week && !end) {
        const growth = data.growth || 0;

        data.growth = growth + 1;
      }
    }

    if (hasHours) {
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
    }

    if (hasDays) {
      const day = e.time.getDay();
      data.days[days[day]] = data.days[days[day]] + 1;
    }

    if (hasDates) {
      let date = e.time.getDate();
      let month = e.time.getMonth() + 1;

      const dateMonth = `${date < 10 ? '0' + date : date}-${month < 10 ? '0' + month : month}`;

      const dateValue = data.dates[dateMonth] || 0;
      data.dates[dateMonth] = dateValue + 1;
    }

    if (hasOs) {
      const osValue = data.os[e.os] || 0;
      data.os[e.os] = osValue + 1;
    }

    if (hasCountries) {
      const countryValue = data.countries[e.country] || 0;
      data.countries[e.country] = countryValue + 1;
    }

    if (hasBrowsers) {
      const BrowserValue = data.browsers[e.browser] || 0;
      data.browsers[e.browser] = BrowserValue + 1;
    }

    if (hasViews || hasMostViewed) {
      const urlsValue = data.views[e.url] || 0;
      data.views[e.url] = urlsValue + 1;
    }
  });


  const viewsArr = Object.entries(data.views);

  if (hasMostViewed && viewsArr.length > 0) {
    //Get Most Viewed

    const sorted = viewsArr.sort(([ka, a], [kb, b]) => {
      if (a>b)
        return +1
      else
        return +1
    });

    const mostViewedURL = sorted[0][0];

    const viewsRes = await posts.findOne({subdomain, url: mostViewedURL}, 'thumbnail title views comments url', {
      lean: true
    });

    data.mostViewed = viewsRes;

    if (!hasViews)
      delete data.views;
  }

  res.json(data);
}
