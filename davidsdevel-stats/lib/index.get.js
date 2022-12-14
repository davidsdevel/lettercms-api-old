const {stats, posts, comments: commentsModel, users: {Users}} = require('@lettercms/models')(['stats', 'views', 'posts', 'comments', 'users']);

const parseFields = fields => {
  if (!fields)
    return {
      all: true
    };

  const fieldsObj = {};

  fields.split(',').forEach(e => {
    fieldsObj[e] = true;
  });

  return fieldsObj;
};

function increment(key, value) {
  if (!value)
    return;

  this[key] = this[key] ? this[key] + value : value;
}

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
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
  Domingo: 0,
  Lunes: 0,
  Martes: 0,
  Miercoles: 0,
  Jueves: 0,
  Viernes: 0,
  Sabado: 0
};

const generateHour = date => {
  let hour = date.getHours();

  if (hour < 12)
    hour = `${hour}AM`;
  else if (hour === 12)
    hour = `${hour}M`;
  else if (hour > 12)
    hour = `${hour - 12}PM`;
  else if (hour === 0)
    hour = '12AM';

  return hour;
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
};

const generateRanges = (start, end) => {
  const dateEnd = new Date(end || Date.now());
  const dateStart = new Date(start || dateEnd - (1000 * 60 * 60 * 24 * 30));
 
  return {
    dateEnd,
    dateStart,
    diff: (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
  };
};

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
    end
  } = query;

  const fields = parseFields(query.fields);

  const conditions = {
    subdomain
  };

  const existsStats = await stats.Stats.exists({subdomain});

  if (!existsStats)
    return res.status(404).json({
      status: 'no-stats',
      message: 'Stats does not exists'
    });

  const hasData =           fields.all || fields.data || query.fields.includes('data.');
  const hasOs =             fields.all || fields.data || fields['data.os'];
  const hasCountries =      fields.all || fields.data || fields['data.countries'];
  const hasBrowsers =       fields.all || fields.data || fields['data.browsers'];
  const hasHours =          fields.all || fields.data || fields['data.hours'];
  const hasDays =           fields.all || fields.data || fields['data.days'];
  const hasDates =          fields.all || fields.data || fields['data.dates'];
  const hasDataViews =      fields.all || fields.data || fields['data.views'];
  const hasReferrers =      fields.all || fields.data || fields['data.referrers'];
  const hasGeneral =        fields.all || fields.general || query.fields.includes('general.');
  const hasMostCommented =  fields.all || fields.general || fields['general.mostCommented'];
  const hasMostViewed =     fields.all || fields.general || fields['general.mostViewed'];
  const hasViews =          fields.all || fields.views;
  const hasComments =       fields.all || fields.comments;
  const hasSubscriptors =   fields.all || fields.subscriptors;

  const {dateEnd, dateStart, diff} = generateRanges(start, end);

  if (diff < 0)
    return res.json({
      code: 'invalid-date',
      message: 'End date must be greather than start date'
    });

  let data = hasData ? {} : undefined;
  let general;
  let views;
  let comments;
  let subscriptors;

  if (hasOs) {
    data.os = {};
    if (os)
      conditions.os = new RegExp(os, 'i');
  }
  if (hasCountries) {
    data.countries = {};
    if (country)
      conditions.country = new RegExp(country, 'i');
  }
  if (hasBrowsers) {
    data.browsers = {};
    if (browser)
      conditions.browser = new RegExp(browser, 'i');
  }

  if (hasHours)
    data.hours = hours;
  if (hasDays)
    data.days = initialDaysCounts;
  if (hasReferrers)
    data.referrers = {};
  if (hasDataViews)
    data.views = {};
  if (hasDates)
    data.dates = generateDates(diff, dateEnd);  
  if (hasGeneral && query.fields.includes('general.')) {
    const generalSelect = query.fields.split(',').filter(e => e.startsWith('general.')).map(e => e.split('.')[1]).join(' ');
    
    general = await stats.Stats.findOne({subdomain}, generalSelect, {lean: true});

    if (fields['general.bounceRate'])
      general.bounceRate = (general.bounces / general.totalViews * 100).toFixed(1);
  }
    
  if (url)
    conditions.url = url;
  
  conditions.time = {
    $gt: dateStart,
    $lt: +dateEnd + (1000 * 60 * 60 * 24)
  };

  const viewData = await stats.Views.find(conditions);

  if (hasViews)
    views = viewData.length;
  
  if (hasComments)
    comments = await commentsModel.countDocuments({published: conditions.time, subdomain});
  
  if (hasSubscriptors)
    subscriptors = await Users.countDocuments({subscriptionTime: conditions.time, subdomain});

  if (hasMostViewed)
    general.mostViewed = await posts.findOne({subdomain}, 'thumbnail title views comments url', {
      sort: {
        views: -1
      },
      lean: true
    });

  if (hasMostCommented)
    general.mostCommented = await posts.findOne({subdomain}, 'thumbnail title views comments url', {
      sort: {
        comments: -1
      },
      lean: true
    });


  viewData.forEach(async e => {
    if (hasHours) {
      const hour = generateHour(e.time);
      increment.call(data.hours, hour, 1);
    }

    if (hasDays) {
      const day = e.time.getDay();
      data.days[days[day]] = data.days[days[day]] + 1;
    }

    if (hasDates) {
      let date = e.time.getDate();
      let month = e.time.getMonth() + 1;

      const dateMonth = `${date < 10 ? '0' + date : date}-${month < 10 ? '0' + month : month}`;

      increment.call(data.dates, dateMonth, 1);
    }

    if (hasOs)
      increment.call(data.os, e.os, 1);

    if (hasCountries)
      increment.call(data.countries, e.country, 1);

    if (hasBrowsers)
      increment.call(data.browsers, e.browser, 1);

    if (hasDataViews)
      increment.call(data.views, e.url === '/' ? 'inicio' : e.url, 1);

    if (hasReferrers && e.referrer)
      increment.call(data.referrers, e.referrer, 1);
    
  });

  res.json({
    general,
    data,
    views,
    comments,
    subscriptors
  });
};
