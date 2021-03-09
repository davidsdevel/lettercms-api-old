const ORIGIN = 'http://localhost:3000';

module.exports = async function() {
  const {
    req,
    res,
    find,
    Model
  } = this;

  const {subdomain} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  if (status)
    condition.postStatus = status;

  const posts = await find({...req.query, posts:true}, Model, condition);
  
  if (req.get('origin') === ORIGIN)
    posts.recommended = await Model.findOne(condition, null, {views: 'asc'});

  res.json(posts);
}