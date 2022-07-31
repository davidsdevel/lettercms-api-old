const {comments, posts, users: {Users}} = require('@lettercms/models')(['comments', 'posts', 'users'])
const {isValidObjectId} = require('mongoose');

module.exports = async function() {
  const {
    find,
    req: {
      subdomain,
      body: {
        userID,
        postID,
        comment
      },
      query
    },
    res
  } = this;

  const conditions = {};

  const isId = isValidObjectId(query.id)

  if (isId)
    conditions.post = query.id;
  else {
    const {_id} = await posts.findOne({url: query.id, subdomain}, '_id');
    
    conditions.post = _id
  }

  const existsPost = await posts.exists({_id: conditions.post});
  if (!existsPost)
    return res.status(404).json({
      status: 'not-found',
      message: 'Post not found'
    });

  const data = await find({
    ...query,
    populate: {
      path: 'user',
      select: 'name lastname'
    }
  }, comments, conditions);

  res.json(data);
}