const {users: {Users, Ratings}} = require('@lettercms/models');

module.exports = async function() {
  const {req: {
    subdomain,
    query: {
      id
    }
  }, res} = this;

  await Users.deleteOne({_id: id, subdomain});
  await Ratings.deleteMany({userID: id});

  res.json({
    status: 'OK'
  });
};
