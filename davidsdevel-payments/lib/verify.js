const captureOrder = require('./paypal/captureOrder');
const {payment} = require('@lettercms/models');

module.exports = async function() {
  const {req: {body: {orderID, amount, email}, subdomain}, res} = this;

  //Check exists order on DB

  const {purchase_units, status, name} = await captureOrder(orderID);

  if (status === 'COMPLETED') {
    const amount = purchase_units[0].payments.captures[0].amount.value;

    await payment.Payment.updateOne({subdomain}, {$inc: {balance: +amount}})

    res.json({
      status: 'OK'
    });
  }

  if (name === 'UNPROCESSABLE_ENTITY')
    res.json({
      status: 'already-captured'
    });
}
