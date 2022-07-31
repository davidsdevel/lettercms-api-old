const {payment} = require('@lettercms/models')(['payment']);

module.exports = async function() {
  const {
    req: {
      subdomain,
      query
    },
    res,
    findSingle
  } = this;

  const data = await findSingle(query, payment.Payment, {
    subdomain
  });

  res.json(data);
}
