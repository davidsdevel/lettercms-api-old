const {accounts: {Invitations}} = require('@lettercms/models')(['invitations']);
const {findOne} = require('@lettercms/utils/lib/findUtils');

module.exports = async function() {
  const {
    req:{query},
    res
  } = this;

  const {id} = query;

  const data = await findOne(Invitations, {_id: id}, query);

  if (data === null)
    return res.status(404).json({message: 'Invitation not found'});

  return res.json(data);
};