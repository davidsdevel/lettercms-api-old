const {pages} = require('@lettercms/models');

module.exports = async function() {
  const {req, res, findSingle} = this;

  const {_id} = req.query;

  const data = await findSingle({
    fields: 'components,html,css,styles'
  }, pages, {_id});

  res.json({
    'gjs-components': data.components || '',
    'gjs-html': data.html || '',
    'gjs-css': data.css || '',
    'gjs-styles': data.styles || ''
  });
};
