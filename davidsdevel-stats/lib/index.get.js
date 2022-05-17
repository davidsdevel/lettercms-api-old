const {stats, posts} = require('@lettercms/models');

Object.prototype.increment = function(key, value) {
  this[key] = this[key] ? this[key] + value : value
}

const days = [
  'Sunday',
  'Monday',
  'Martes',
  'Miercoles',
  'Jueves',
  'Friday',
  'Saturday',
];

const hours = {
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

const initialDaysCounts = {
  Sunday: 0,
  Monday: 0,
  Martes: 0,
  Miercoles: 0,
  Jueves: 0,
  Friday: 0,
  Saturday: 0
};

const generateDates = (daysCount, dateEnd) => {
  const dates = {};

  for (let i = Math.floor(daysCount); i >= 0; i -= 1) {
      const time = new Date(dateEnd - ((i - 1)* 1000 * 60 * 60 * 24));
      const month = time.getMonth() + 1;
      const date = time.getDate();

      const path = `${date < 10 ? `0${date}` : date}-${month < 10 ? `0${month}` : month}`;
      
      dates[path] = 0;
    }

    return dates;
}

const generateRanges = (start, end) => {
  const dateEnd = end ? new Date(end) : Date.now();
  const dateStart = new Date(start ? start : dateEnd - (1000 * 60 * 60 * 24 * 30));
 
  return {
    dateEnd,
    dateStart,
    diff: (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
  }
}

module.exports = async function() {
  const {
    req: {
      query,
      subdomain
    },
    res
  }  = this;

  const {
    url,
    os,
    browser,
    country,
    start,
    end,
    fields
  } = query;

  const conditions = {
    subdomain
  };

  const existsStats = await stats.Stats.exists({subdomain});

  if (!existsStats)
    return res.status(404).json({
      status: 'no-stats',
      message: 'Stats does not exists'
    });

  const hasOs = !fields || (fields.includes('os') && !fields.includes('most'));
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

  const {dateEnd, dateStart, diff} = generateRanges(start, end);

  if (diff < 0)
    return res.json({
      code: 'invalid-date',
      message: 'End date must be greather than start date'
    });

  let data = {};

  if (hasOs)
    data.os = {};
  if (hasCountries)
    data.countries = {};
  if (hasBrowsers)
    data.browsers = {};
  if (hasHours)
    data.hours = hours;
  if (hasDays)
    data.days = initialDaysCounts;
  if (hasViews || hasMostViewed)
    data.views = {};
  if (hasDates)
    data.dates = generateDates(diff, dateEnd);  
  if (hasGeneral)
    data.general = await stats.Stats.findOne({subdomain});
  if (hasMostCommented)
    data.mostCommented = await posts.findOne({subdomain}, 'thumbnail title views comments url', {
      sort: {
        comments: -1
      },
      limit: 1,
      lean: true
    });

  if (hasOs)
    conditions.os = new RegExp(os, 'i');
  if (hasBrowsers)
    conditions.browser = new RegExp(browser, 'i');
  if (hasCountries)
    conditions.country = new RegExp(country, 'i');
  if (url)
    conditions.url = url;
  
  conditions.time = {
    $gt: new Date(dateStart.toISOString()),
    $lt: new Date(new Date(new Number(dateEnd) + (1000 * 60 * 60 * 24)).toISOString())
  };

  
  if (hasTotal)
    data.total = await stats.Views.estimatedDocumentCount(conditions);

  const views = await stats.Views.find(conditions);
  
  const weekDate = new Date(dateEnd - (1000 * 60 * 60 * 24 * 7));

  const week = new Date(weekDate);

  views.forEach(async e => {
    if (hasGrowth) {
      if (e.time > week && !end)
        data.increment('growht', 1);
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

      data.dates.increment(dateMonth, 1)
    }

    if (hasOs)
      data.browsers.increment(e.os, 1);

    if (hasCountries)
      data.browsers.increment(e.country, 1)

    if (hasBrowsers)
      data.browsers.increment(e.browser, 1);

    if (hasViews || hasMostViewed)
      data.views.increment(e.url, 1);
    
  });


  const viewsArr = Object.entries(data.views);

  if (hasMostViewed && viewsArr.length > 0) {
    //Get Most Viewed

    const sorted = viewsArr.sort(([_, a], [__, b]) =>  a > b ? +1 : -1);

    const mostViewedURL = sorted[0][0];

    const viewsRes = await posts.findOne({subdomain, url: mostViewedURL}, 'thumbnail title views comments url', {
      lean: true
    });

    data.mostViewed = viewsRes;

    if (!hasViews)
      delete data.views;
  }

  res.json(data);
};
