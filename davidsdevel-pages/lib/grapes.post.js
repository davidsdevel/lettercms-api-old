const {pages} = require('@lettercms/models');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;
  const {_id} = req.query;

  //TODO: Only Used by Letter CMS
  const components = req.body['gjs-components'];
  const html = req.body['gjs-html'];
  const css = req.body['gjs-css'];
  const styles = req.body['gjs-styles'];

  await pages.updatePage({_id}, {
    components,
    html,
    css,
    styles
  });

  res.json({
    status: 'OK'
  });
}
