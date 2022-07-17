const getOrder = require('./paypal/getOrder');

module.exports = async function() {
  const {req: {query: {id}}, res} = this;

  const order = await getOrder(id);

  res.json(order);
}