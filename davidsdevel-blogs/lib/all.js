const {blogs} = require('@lettercms/models')(['blogs']);
const {find} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {
    req: {isAdmin, query, path},
    res
  } = this;

  if (!isAdmin)
    return res.sendStatus(404);

  const data = await find(blogs, {}, query);

  res.json(data);
};
