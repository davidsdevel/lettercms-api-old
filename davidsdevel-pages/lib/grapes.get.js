module.exports = async function() {
  const {req, res, Model, findSingle} = this;

  const {_id} = req.query;

  const data = await findSingle({
    fields: 'components,html,css,styles'
  }, Model, {_id});

  res.json({
    'gjs-components': data.components,
    'gjs-html': data.html,
    'gjs-css': data.css,
    'gjs-styles': data.styles,
  });
}
