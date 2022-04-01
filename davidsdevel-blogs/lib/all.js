const {blogs} = require(process.cwd() + '/mongo');

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
