module.exports = async function() {
  const {
    req: {isAdmin, query},
    res,
    Model,
    find
  } = this;

  if (!isAdmin)
    return res.sendStatus(404);

  const data = await find(query, Model, {});

  res.json(data);
}
