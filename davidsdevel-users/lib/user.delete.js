const {users: {Users, Ratings}, comments} = require('@lettercms/models')(['users', 'ratings', 'comments']);

module.exports = async function() {
  const {req: {
    subdomain,
    query: {
      id
    }
  }, res} = this;

  await Users.deleteOne({_id: id, subdomain});
  await Ratings.deleteMany({userID: id});
  await comments.deleteMany({user: id});

  res.json({
    status: 'OK'
  });
};
