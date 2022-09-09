const {pages} = require('@lettercms/models')(['pages']);
const {isValidObjectId} = require('mongoose');
const {findOne} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {req: {
    subdomain,
    query
  }, res} = this;

  const {url} = query;

  let data;
  const isId = isValidObjectId(url);

  if (isId)
    data = await findOne(pages, {_id: url}, query);

  if (data === null)
    data = await findOne(pages, {url, subdomain}, query);

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
};
