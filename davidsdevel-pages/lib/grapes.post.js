const {pages} = require('@lettercms/models')(['pages']);

module.exports = async function() {
  const {req: {body, query}, res} = this;
  const {_id} = query;

  //TODO: Only Used by Letter CMS
  const components = body['gjs-components'];
  const html = body['gjs-html'];
  const css = body['gjs-css'];
  const styles = body['gjs-styles'];

  await pages.updatePage({_id}, {
    components,
    html,
    css,
    styles
  });

  res.json({
    status: 'OK'
  });
};
