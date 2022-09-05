const {pages} = require('@lettercms/models')(['pages']);

module.exports = async function() {
  const {req: {body, query}, res} = this;
  const {_id} = query;
  const {html, css} = body;

  //TODO: Only Used by Letter CMS

  await pages.updatePage({_id}, {
    html,
    css
  });

  res.json({
    status: 'OK'
  });
};
