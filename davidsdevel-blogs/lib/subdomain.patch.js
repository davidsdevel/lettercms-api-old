const {blogs} = require(process.cwd() + '/mongo');
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {
    subdomain
  } = req;

  const condition = {
    subdomain
  };

  const db = await blogs.updateOne(condition, req.body);

  if (db.ok)
    return res.json({
      status: 'OK'
    });


  res.json({
    status:'not-modified'
  });
}