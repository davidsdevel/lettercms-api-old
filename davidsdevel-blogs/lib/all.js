const {blogs} = require('@lettercms/models');

module.exports = async function() {
  const {
    req: {isAdmin, query},
    res,
    find
  } = this;

  if (!isAdmin)
    return res.sendStatus(404);

  const data = await find(query, blogs, {});

  res.json(data);
}
