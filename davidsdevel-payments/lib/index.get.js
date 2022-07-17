const {payment} = require('@lettercms/models');

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
