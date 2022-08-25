const {posts, pages} = require('@lettercms/models')(["posts", "pages"]);

module.exports = async function(req, res) {
  const {query: {subdomain}} = req;

  const postData = await pages.find({subdomain}, "url", {lean: true});
  const pageDats = await posts.find({subdomain}, "url", {lean: true});
  const data = Object.assign([], posts, pages).map(e => e.url);
  
  res.json(data);
}
