const {blogs} = require(process.cwd() + '/mongo');
const {isValidObjectId} = require('mongoose');

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
}