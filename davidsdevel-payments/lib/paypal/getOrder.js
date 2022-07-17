const getAccessToken = require('./getAccessToken');
const fetch = require('node-fetch');
const config = require('./config');

module.exports = async orderID => {
  const accessToken = await getAccessToken();
  const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v2/checkout/orders/${orderID}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  return res.json();
};
