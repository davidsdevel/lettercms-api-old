const {accounts} = require('@lettercms/models')(['invitations']);

module.exports = async function() {
  const {
    req:{query},
    res,
    findSingle
  } = this;

  const {id} = query;

  query.populate = {
    path: 'blog',
    select: 'title subdomain'
  };

  const data = await findSingle(query, accounts.Invitations, {_id: id});

  if (data === null)
    return res.status(404).json({message: 'Invitation not found'});

  return res.json(data);
};