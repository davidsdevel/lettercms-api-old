const {posts, users: {Ratings, Users}} = require('@lettercms/models')(['posts', 'users', 'ratings']);

module.exports = async function() {
  const {req: {subdomain, body}, res} = this;

  const {_id: id} = await Users.create({...body, subdomain});

  posts.find({subdomain, postStatus: 'published'}, '_id')
    .then(data => {
      Promise.allSettled(
        data.map(({_id}) => {
          Ratings.create({
            userID: id,
            post: _id,
            subdomain
          });
        })
      ).then(() => console.log('Done'))
    });

  res.json({
    status: 'OK',
    id
  });
};