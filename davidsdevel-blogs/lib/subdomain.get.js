const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res,
    findSingle,
    Model
  } = this;

  const {
    subdomain
  } = req;

  let data = await findSingle(req.query, Model, {
    subdomain
  });

  res.json(data);
}