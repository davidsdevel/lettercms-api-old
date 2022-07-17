const getAccessToken = require('./getAccessToken');
const fetch = require('node-fetch');
const config = require('./config');

module.exports = async item => {
  const accessToken = await getAccessToken();
  const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify(item)
  });

  return res.json();
};