const {blogs} = require('@lettercms/models')(["blogs"])

module.exports = async function(req, res) {
  const data = await blogs.find({}, "subdomain", {lean: true});

  res.json(data.map(e => e.subdomain));
}