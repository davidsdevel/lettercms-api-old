const {pages} = require('@lettercms/models')(['pages']);
const {findOne} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {req, res, findSingle} = this;

  const {_id} = req.query;

  const {html, css} = await findOne(pages, {_id}, {fields: 'html,css'});

  res.setHeader('Content-Type', 'application/json');

  res.send({
    html,
    css
  });
};
