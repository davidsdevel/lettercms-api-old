const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res, findSingle, Model} = this;

  const {subdomain} = req;
  const {
    url,
    category,
    day,
    month,
    year
  } = req.query;

  const conditions = {
    subdomain,
    url
  };

  if (category)
    conditions.category = category;
  if (day) {
    conditions.$where = `this.published.getDate() === ${day}`;
  }
  if (month) {
    let str = `this.published.getMonth() === ${month - 1}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }
  if (year) {
    let str = `this.published.getFullYear() === ${year}`;
    conditions.$where = conditions.$where ? [conditions.$where,  str].join(' && ') : str;
  }

  let data;

  if (!category && !day && !month && !year) {
    const isId = isValidObjectId(url);

    if (isId) {
      data = await findSingle(req.query, Model, {
        _id: url
      });

      if (data !== null)
        return res.json(data);
    }
  }

  data = await findSingle(req.query, Model, conditions);

  if (data === null)
    res.status(404).json({
      message: `"${url}" does not exists`
    });
  else
    res.json(data);
}