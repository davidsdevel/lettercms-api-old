const {posts, users: {Users, Ratings}} = require('@lettercms/models');

const parseTags = arr => {
  const tags = {};

  arr.forEach(e => tags[e] = 1);

  return tags;
}

module.exports = async function() {
  const {
    res,
    req: {
      query: {
        id
      },
      body: {
        url
      },
      subdomain
    }
  } = this;

  const existsUrl = await posts.exists({subdomain, url});

  if (!existsUrl)
    return res.json({
      status: 'not-found'
    });


  const {tags, _id} = await posts.findOne({subdomain, url}, 'tags');

  const views = parseTags(tags);
  const {postsView} = await Users.findOneAndUpdate({_id: id}, {$push: {views}, $inc: {postsView: 1}});
  await Ratings.updateOne({post: _id}, {viewed: true});

  res.json({
    status: 'OK'
  });
};
