const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {req, res, findSingle, Model} = this;

  const {url} = req.query;
  const {subdomain} = req;

  let data;
  const isId = isValidObjectId(url);

  if (isId) {
    data = await findSingle(req.query, Model, {
      _id: url
    });

    if (data !== null)
      return res.json(data);
  }

  data = await findSingle(req.query, Model, {
    url,
    subdomain
  });

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
}
