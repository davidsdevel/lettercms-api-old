/*var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);*/

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {
    id
  } = req.query;
  const {subdomain} = req;
  const {url} = req.body;

  const now = Date.now();

  const date = new Date(now  + (1000 * 60 * 60 * 24 * 30));

  const day = date.getDate();
  const month = date.getUTCMonth();
  const year = date.getFullYear();

  const expires_at = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  
  /*await ger.events([
    {
      namespace: subdomain,
      person: id,
      action: 'views',
      thing: url,
      expires_at
    }
  ]);*/

  res.json({
    status: 'OK'
  });
}
