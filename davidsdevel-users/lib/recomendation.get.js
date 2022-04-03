/*var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
*/

module.exports = async function() {
  /*const {
    req,
    res
  } = this;

  const {
    id,
    fields
  } = req.query;
  const {subdomain} = req;

  const {recommendation} = await ger.recommendations_for_person(subdomain, id, {
    actions: {
      views: 1
    },
    recommendations_per_neighbour: 1
  });

  const {posts} = sdk.useSubdomain(subdomain);

  const post = await posts.single(recommendation[0].thing, fields ? fields.split(',') : null);
*/
  res.json({});
}
