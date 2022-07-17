const getAccessToken = require('./getAccessToken');
const fetch = require('node-fetch');
const config = require('./config');

module.exports = async order => {
  const {order_id, patch_details} = order;

  const accessToken = await getAccessToken();

  const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v2/checkout/orders/${order_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify(patch_details)
  });

  return res.json();
};
