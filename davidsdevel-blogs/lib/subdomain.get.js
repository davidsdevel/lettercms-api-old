const {blogs} = require('@lettercms/models')(['blogs']);

module.exports = async function() {
  const {
    req,
    res,
    findSingle
  } = this;

  const {
    subdomain
  } = req;

  let data = await findSingle(req.query, blogs, {
    subdomain
  });

  res.json(data);
};