const {comments} = require('@lettercms/models')(['comments']);

module.exports = async function() {
  const {req, res} = this;

  const {id} = req.query;

  await comments.deleteOne({_id: id});

  res.json({
    status: 'OK'
  });
};
