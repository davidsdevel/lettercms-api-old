const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res,
    Model
  } = this;

  const {
    subdomain
  } = req;

  const condition = {
    subdomain
  };

  const db = await Model.updateOne(condition, req.body);

  if (db.ok)
    return res.json({
      status: 'OK'
    });


  res.json({
    status:'not-modified'
  });
}