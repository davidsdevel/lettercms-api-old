const captureOrder = require('./paypal/captureOrder');

module.exports = async function() {
  const {req: {query: {id}}, res} = this;

  const order = await captureOrder(id);

  res.json(order);
}
