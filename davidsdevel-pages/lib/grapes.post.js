const {pages} = require('@lettercms/models')(['pages']);

module.exports = async function() {
  const {req: {body, query}, res} = this;
  const {_id} = query;
  const {data, html, css} = body;

  //TODO: Only Used by Letter CMS

  await pages.updatePage({_id}, {
    html,
    css,
    grapesData: data
  });

  res.json({
    status: 'OK'
  });
};
