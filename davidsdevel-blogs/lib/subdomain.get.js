const {blogs} = require('@lettercms/models')(['blogs']);
const {findOne} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const data = await findOne(blogs, {subdomain}, query);

  res.json(data);
};