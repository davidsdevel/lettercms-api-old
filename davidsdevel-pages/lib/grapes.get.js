const {pages} = require('@lettercms/models')(['pages']);

module.exports = async function() {
  const {req, res, findSingle} = this;

  const {_id} = req.query;

  const {html, css} = await findSingle({
    fields: 'html css'
  }, pages, {_id});

  res.setHeader('Content-Type', 'application/json')
  res.send({
    html,
    css
  });
};
