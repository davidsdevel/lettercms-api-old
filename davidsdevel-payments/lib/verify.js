const captureOrder = require('./paypal/captureOrder');
const {payment} = require('@lettercms/models')(['payment']);

module.exports = async function() {
  const {req: {body: {orderID, amount, email, type}, subdomain}, res} = this;

  //Check exists order on DB

  const {purchase_units, status, name} = await captureOrder(orderID);

  if (status === 'COMPLETED') {
    const amount = purchase_units[0].payments.captures[0].amount.value;
    if (type === 'funds')
      await payment.Payment.updateOne({subdomain}, {$inc: {balance: +amount}});
    else if (type === 'payment') {
      const {lastPayment} = await payment.Payment.findOne({subdomain}, 'lastPayment', {lean: true});
      
      const last = new Date(lastPayment);
      const next = new Date(lastPayment);

      last.setMonth(last.getMonth() + 1);
      next.setMonth(next.getMonth() + 2);

      await payment.Payment.updateOne({subdomain}, {lastPayment: last, nextPayment: next});
    }
      
    res.json({
      status: 'OK'
    });
  }

  if (name === 'UNPROCESSABLE_ENTITY')
    res.json({
      status: 'already-captured'
    });
};
